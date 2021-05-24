const express = require('express');
const conn = require('./source/sqlconn.js')

const app = express();



app.listen(3000,function(){
    console.log('server is running.....');
})

// express 导入 art-template
app.engine('html',require('express-art-template'))

app.use('/public/',express.static('./public/'))
app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))

app.get('/',function(req,res){
    res.render('menu.html');
})
// 响应登录页面
app.get('/user_login',function(req,res){
    res.render('index.html');
})
// 响应忘记密码页面
app.get('/forgot',function(req,res){
    res.render('forgot.html');
})
// 响应注册页面
app.get('/sign-up',function(req,res){
    res.render('sign-up.html');
})


// 接收用户登录
/**
 * data.user 用户名
 * data.psw  密码
 * 
 */
app.post('/form',function(req,res){
    const data = req.body;
    const sql = "select * from user where user = ? and psw = ?"

    conn.query(sql,[data.user,data.psw],function(err,resl){
        if(err){
            res.render('login_res.html',{result:"登录失败"})
        }else{
            if(resl[0] == null) res.render('login_res.html',{result:"登录失败"})
            else{
                 res.render('login_res.html',{result:"登录成功！"})
            }
           
        }
    })

})
// 接收用户注册
/**
 * url /sign-up/from
 * 
 */
app.post('/sign-up/from',function(req,res){
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