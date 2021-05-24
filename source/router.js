const express = require('express');
const conn = require('./sqlconn.js')
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: false }));

router.get('/',function(req,res){
    res.render('menu.html',{url:'/user_login',btn_msg:'Login'});
})
// 响应登录页面
router.get('/user_login',function(req,res){
    res.render('index.html');
})
// 响应忘记密码页面
router.get('/forgot',function(req,res){
    res.render('forgot.html');
})
// 响应注册页面
router.get('/sign-up',function(req,res){
    res.render('sign-up.html');
})
// 接收用户登录
/**
 * data.user 用户名
 * data.psw  密码
 * 
 */
router.post('/form',function(req,res){
    const data = req.body;
    console.log(data)
    const sql = "select * from user where user = ? and psw = ?"

    conn.query(sql,[data.user,data.psw],function(err,resl){
        if(err){
            res.render('login_res.html',{result:"登录失败"})
        }else{
            if(resl[0] == null) res.render('login_res.html',{result:"登录失败"})
            else{
                 res.render('menu.html',{url:"#",btn_msg:data.user})
            }
           
        }
    })
})
// 接收用户注册
/**
 * url /sign-up/from
 * 
 */
router.post('/sign-up/from',function(req,res){
    const data = req.body;
    const sql = "insert into user value(?,?)"
    conn.query(sql,[data.user,data.psw],function(err,resl){
        if(err){
            res.render('sign_res.html',{
                result:"注册失败"
            })
        }else{
            if(resl.affectedRows == 0)res.render('sign_res.html',{result:"注册失败"})
            else res.render('sign_res.html',{result:'注册成功'})
        }
    })
})
module.exports = router;