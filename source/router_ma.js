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
router.post('/zhu_ye',async (req,res)=>{
    const sql_users = "select * from user limit 5";
    const sql_history = "select * from history limit 5"

    const data_users = await db(sql_users);
    const data_history = await db(sql_history);

    let history = JSON.stringify(data_history);
    let users = JSON.stringify(data_users);
    console.log("查找到的用户数据为："+users);
    console.log('历史数据为：'+history)
    users = JSON.parse(users);
    history = JSON.parse(history)
    res.render('zhu_ye.html',{
        users:users,
        history:history,
    });
})
// 用户列表
router.post("/user_list",async (req,res)=>{
    const sql = 'select  * from user'
    const data = await db(sql);
    let data_str = JSON.stringify(data);
    let user_list = JSON.parse(data_str);
    res.render('users.html',{
        users:user_list
    })
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
router.post('/total',async (req,res)=>{
    const sql_history = 'select * from history';
    let data = await db(sql_history);
    data = JSON.stringify(data);
    console.log('查询到的历史购票记录为：'+ data);
    data = JSON.parse(data);
    res.render('tong_ji.html',{
        history:data,
    });
})
// 电影上架
router.post("/shang_jia",(req,res)=>{
    res.render('shang_jia.html');
})

// 用户名修改
router.post('/change_email',(req,res)=>{
    const email = req.body.email;
    console.log('需要修改用户信息的账号为：'+email)
    res.render('user_change.html',{
        email:email,
    })
})
// 修改用户信息
router.get('/change_email',async (req,res)=>{
    let data = req.query;
    const sql_del = 'delete from user where user = ?';
    const sql_ins = 'insert into user value(?,?,?)';
    try{
        let del_result = await db(sql_del,[data.user]);
        let ins_result = await db(sql_ins,[data.user,data.psw,data.name])
        res.render('man_change_success.html')
    }catch(err){
        res.send(err);
    }
    
})
// 删除用户
router.post('/del_email',async (req,res)=>{
    let data = req.body;
    const sql_del = 'delete from user where user = ?';
    try{
        await db(sql_del,[data.email]);
        res.redirect(307,'/user_list')
    }catch(err){
        res.send(err)
    }
})
// 购票页面
router.get('/sell_ticket1',(req,res)=>{
    res.render("sell_ticket1.html")
})
router.get('/sell_ticket2',(req,res)=>{
    res.render("sell_ticket2.html")
})
// 购票成功
router.get('/shop_success',(req,res)=>{
    res.render('shop_success.html')
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