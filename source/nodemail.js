const nodemailer = require("nodemailer");

// 创建一个 smtp 服务器
const config = {
    host:'smtp.163.com',
    service:"163",  //  邮箱
    secure:true,
    port:456,
    auth:{
        user:'ticketsystem2021@163.com',
        pass:'IQQZDPQUYWEZJRYU' // 邮箱授权码
    }
}

const transporter = nodemailer.createTransport(config);

module.exports = function(mail,res){
    transporter.sendMail(mail,function(err,info){
        if(err){
            console.log(err);
            res.json({status:400,msg:"send fail....."})
        }else{
            console.log(info);
            res.json({status:200,msg:"邮件发送成功....."})
        }
    })
}