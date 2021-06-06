const express = require('express');
const db = require('./db.js')
const router = express.Router();
const tools = require('./tools.js')
const nodemail = require('./nodemail.js')


router.use(express.json())
router.use(express.urlencoded({ extended: false }));

router.get('/', function (req, res) {
    console.log("/ 请求主页面")
    res.render('menu.html', { url: '/user_login', btn_msg: '登录',vaule:'' });
})
// 响应登录页面
router.get('/user_login', function (req, res) {
    console.log('/user_login 登录页面')
    res.render('index.html');
})
// 响应忘记密码页面
router.get('/forgot', function (req, res) {
    console.log('/forgot 忘记密码页面')
    res.render('forgot.html');
})
// 响应注册页面
router.get('/sign-up', function (req, res) {
    console.log('/sign-up 注册页面')
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
    console.log('/form 登录验证账号：'+data.user+'验证的密码为：'+ data.psw)
    const sql = "select * from user where user = ? and psw = ?";
    const result = await db(sql, [data.user, data.psw]);
    if (result.length != 0) {
        res.render('menu.html', {
            url: "/home?email="+data.user,
            btn_msg: data.user,
        })
    }
})
// 用于判断账号和密码是否正确
router.get('/formTest', async (req, res) => {
    // 获取 get 数据
    const data = req.query;
    console.log('/formTest 验证的账号为'+data.user+",密码为:"+data.psw)
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
    console.log('/sign-up/form 注册的账号为'+data.user+",注册密码为:"+data.psw)
    const data = req.body;
    const sql = "insert into user value(?,?);";
    const result = await db(sql, [data.user, data.psw]);
    if (result.affectedRows == 0) res.render('sign_res.html', { result: "注册失败" });
    else res.render('sign_res.html', { result: '注册成功' });
})
// 判断用户名是否重复 ajax
router.get('/findUser', async (req, res) => {
    
    const data = req.query;
    console.log("/findUser 判断 "+data.email+" 是否重复");
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
                subject: '票多多 账号验证凭证',//邮箱主题
                // 收件人
                to: email,//前台传过来的邮箱
                // 邮件内容，HTML格式
                text: `您的验证码为${code} 票多多电影城是四川省电影公司全资影城、属拼多多电影院线旗下影院，
                创立于2021年5月，距今已2个月历史，累计票房收入2.3亿元，接待观众超过2千余万。
                影城成立以来先后投资三千余万元，经数次装修改造，使影城始终引领电影时尚潮流。
                 地处最繁华的春熙路商圈核心位置， 拥有18个豪华电影厅，观众座席数2000多座，
                 是全国影厅最多、节目最多、场次最多、人次最多的影城。率先引进数字3D电影，
                 影厅内安装有世界顶级的英国杜比CP650(EX)数字处理器、 美国JBL音响、德国ISCO一体化镜头、
                 美国QSC数字功放（DCA）、 6.1声道杜比数码立体声系统！发送者:ticketsystem2021@qq.com`
            };
            let time;
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
            nodemail(mail, res);//发送邮件
            clearTimeout(time)
            console.log("/email 发送邮件 email:" + email, "code:" + code)

        }
    } catch (err) {
        console.log(err)
    }
})
// 判断是否输入的邮箱与验证码是否符合 ajax
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
// 如果符合就跳转到修改密码界面
// 将邮箱传回
router.post('/findPsw', async (req, res) => {
    console.log(req.body);
    res.render('findPsw.html', {
        email: req.body.email,
    });
})
// 修改密码
router.post('/change', async (req, res) => {
    console.log('/change 修改的email与新密码:' + req.body.email, req.body.newPsw)
    const email = req.body.email;
    const newPsw = req.body.newPsw;
    const sql = "update user set psw = ? where user = ?"
    const result = await db(sql, [newPsw, email]);
    if (result.affectedRows == 0) {
        res.send('服务器连接问题，修改失败');
    } else {
        res.render('change_success.html');
    }
})
// 进入个人主页
router.get('/home',(req,res)=>{
    const data = req.query;
    res.render('home.html',{
        email:data.email,
    })
})
// 返回到菜单
router.get('/form',(req,res)=>{
    const email = req.query.email;
    res.render('menu.html', {
        url: "/home",
        btn_msg: email
    })
})
// 用户修改密码
router.get('/changePsw',(req,res)=>{
    const data = req.query.email;
    console.log(data)
    res.render('changePsw.html',{
        email:data,
    })
})
module.exports = router;