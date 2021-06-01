const express = require('express');
const db = require('./db.js')
const router = express.Router();
const tools = require('./tools.js')
const nodemail = require('./nodemail.js')


router.use(express.json())
router.use(express.urlencoded({ extended: false }));

router.get('/', function (req, res) {
    res.render('menu.html', { url: '/user_login', btn_msg: '登录' });
})
// 响应登录页面
router.get('/user_login', function (req, res) {
    res.render('index.html');
})
// 响应忘记密码页面
router.get('/forgot', function (req, res) {
    res.render('forgot.html');
})
// 响应注册页面
router.get('/sign-up', function (req, res) {
    res.render('sign-up.html');
})
// 接收用户登录
/**
 * data.user 用户名
 * data.psw  密码
 * 
 */
router.post('/form', async (req, res) => {
    // 获取 post  表单数据
    const data = req.body;
    const sql = "select * from user where user = ? and psw = ?";

    const result = await db(sql, [data.user, data.psw]);
    if (result.length != 0) {
        res.render('menu.html', {
            usl: "javascript:void(0);",
            btn_msg: data.user
        })
    }
})
// 用于判断账号和密码是否正确
router.get('/formTest', async (req, res) => {
    // 获取 get 数据
    const data = req.query;
    const sql = "select * from user where user = ? and psw = ?";
    // 查询到的结果
    const result = await db(sql, [data.user, data.psw]);
    if (result.length == 0) res.send("no");
    else res.send("yes");

})

// 接收用户注册
/**
 * url /sign-up/from
 * 
 */
router.post('/sign-up/from', async (req, res) => {
    // 使用 await promise 时会自动转换为 resolve 函数中的参数
    const data = req.body;
    const sql = "insert into user value(?,?);";
    const result = await db(sql, [data.user, data.psw]);
    if (result.affectedRows == 0) res.render('sign_res.html', { result: "注册失败" });
    else res.render('sign_res.html', { result: '注册成功' });
})
// 判断用户名是否重复 ajax
router.get('/findUser', async (req, res) => {
    const data = req.query;
    const sql = "select * from user where user = ?"
    const result = await db(sql, [data.email]);
    if (result.length == 0) res.send('yes');
    else res.send('no');
})

// 发送邮件 ajax
router.get('/email', async (req, res) => {
    const email = req.query.email;//刚刚从前台传过来的邮箱
    const code = tools.createSixNum();//生成的随机六位数
    const delay = 300000;   // 验证码的作用时间
    const sql = "select * from user where user = ?"
    try {
        const result = await db(sql, [email]);
        console.log(result);
        if (result.length == 0) {
            res.json({ status: 400, message: 'no' });
        } else {
            req.body = { success: true, message: "账号可行" };//数据传回前台
            var mail = {
                // 发件人
                from: 'ticketsystem2021@163.com',
                // 主题
                subject: '接受凭证',//邮箱主题
                // 收件人
                to: email,//前台传过来的邮箱
                // 邮件内容，HTML格式
                text: '用 ' + code + ' 作为你的验证码'//发送验证码
            };
            let time;
            try {
                const delSql = "delete from checkcode where email = ?;"
                const inSql = "insert into checkcode value(?,?);"
                await db(delSql, [email]);
                await db(inSql, [email, code]);
                time = setTimeout(() => {
                    const delCode = "delete from checkcode where email = ?";
                    try {
                        db(delCode, [email]);
                    } catch (err) {
                        console.log(err);
                    }
                }, delay)
            } catch (err) {
                console.log(err);
            }
            nodemail(mail, res);//发送邮件
            clearTimeout(time)
            console.log("email:" + email, "code:" + code)

        }
    } catch (err) {
        console.log(err)
    }
})
router.get('/findPsw', async (req, res) => {
    const data = req.query;
    console.log(data.email, data.code)
    const sql = "select * from checkcode where email = ? and code = ?"
    const result = await db(sql, [data.email, data.code]);
    if (result.length > 0) {
        console.log(result)
        res.send("yes")
    }

    else res.send("no");
})
router.post('/findPsw',async (req,res)=>{
    console.log(req.body);
    res.render('findPsw.html');
})
module.exports = router;