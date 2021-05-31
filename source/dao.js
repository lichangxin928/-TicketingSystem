const conn = require("./sqlconn");

module.exports = {
    findUser:function(email,method){
        const sql = "select * from user where user = ?";
        conn.query(sql,[email],function(err,resl){
            // 负一表示数据库出现问题
            if(err) method(-1);
            // 表示没有查找到数据，能够进行注册
            else if(resl.length==0) method(1);
            // 数据库中已经有此用户名
            else method(0);
        })
    },
    CheckUser:function(data,method){
        console.log(data)
        const sql = "select * from user where user =? and psw =?";
        conn.query(sql,[data.user,data.psw],function(err,resl){
            if(resl.length == 1) method(1);
            else method(0);
        })
    }

}