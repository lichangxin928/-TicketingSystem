const nodemailer = require("nodemailer");

// 创建一个 smtp 服务器
const config = {
    host:'smtp.163.com',
    port:456,
    auth:{
        user:'ticketsystem2021@163.com',
        pass:'IQQZDPQUYWEZJRYU' // 邮箱授权码
    }
}

const transporter = nodemailer.createTransport(config);

module.exports = function(mail){
    transporter.sendMail(mail,function(err,info){
        if(err){
            return console(err);
        }
        console.log('mail sent',info.response);
    })
}