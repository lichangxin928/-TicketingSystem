const express = require('express');
const db = require('./db.js')
const router = express.Router();

// 获取 post 请求
router.use(express.json())
router.use(express.urlencoded({ extended: false }));
// 修改默认路径


// 返回登陆界面
router.get('/admir',(req,res)=>{
    console.log('/admir 管理员登陆');
    res.render('sign-in.html');
})

/**
 * @param user 用户名
 * @param psw  密码
 * 
 * ajax 判断账号密码否正确
 * 
 * @returns yes 账号密码正确
 * @returns no  账号密码错误 
 */
router.get('/checkMan',async (req,res)=>{
    const data = req.query;
    console.log("/checkMan ajax 验证管理员账号密码")
    const sql = 'select * from manage where user = ? and psw = ?';
    try{
        const result = await db(sql,[data.user,data.psw]);
        if(result.length == 0){
            res.send('no');
        }else{
            res.send('yes')
        }
    }catch(err){
        // 数据库连接问题
        res.render('403.html');
        console.log(err);
    }
})
// 通过 ajax 如果验证成功，则将管理员主页返回
router.post('/zhu_ye',(req,res)=>{
    res.render('zhu_ye.html');
})
// 用户列表
router.post("/user_list",(req,res)=>{
    res.render('users.html')
})
// 用户删改
router.post('/user_change',(req,res)=>{
    res.render('user_change.html');
})
// 其他
router.post('/more',(req,res)=>{
    res.render('more.html');
})
// 电影售票统计
router.post('/total',(req,res)=>{
    res.render('tong_ji.html');
})
// 电影上架
router.post("/shang_jia",(req,res)=>{
    res.render('shang_jia.html');
})

// 错误提示页面
router.post('/403',(req,res)=>{
    res.render('403.html')
})
router.post('/404',(req,res)=>{
    res.render('404.html')
})
router.post('/500',(req,res)=>{
    res.render('500.html')
})
router.post('/503',(req,res)=>{
    res.render('503.html')
})

// 创建路由
module.exports = router;