const express = require('express');
const db = require('./db.js')
const url = require("url");
const router = express.Router();


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

router.get('/formTest', async (req, res) => {
    // 获取 get 数据
    const data = url.parse(req.url, true).query;
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
router.post('/sign-up/from',async (req, res) => {
    const data = req.body;
    const sql = "insert into user value(?,?);";
    const result = await db(sql,[data.user,data.psw]);
    if(result.affectedRows == 0) res.render('sign_res.html',{result:"注册失败"});
    else res.render('sign_res.html',{result:'注册成功'});
})

router.get('/findUser',async (req,res) => {
    const data = url.parse(req.url,true).query;
    const sql = "select * from user where user = ?"
    const result = await db(sql,[data.email]);
    if(result.length==0) res.send('yes');
    else res.send('no');
})
module.exports = router;