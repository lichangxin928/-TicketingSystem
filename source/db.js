const mysql = require('mysql');
//创建数据池
//如果每次都是用createConnect来连接那么每次还需要进行关闭数据库连接的操作，略显繁琐
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',	//默认情况下的主机名
    user: 'root',			//默认情况下的用户名
    password: '123',		//安装时设置的密码
    database: 'ticketing',		//连接的数据库名字
    multipleStatements: true,
    timezone: "SYSTEM"
});
//使用时传入对应参数，sql为相应sql语句，data为插入或修改所需要的数据
module.exports = (sql, data = []) => {
    //使用Promise解决mysql的命令处理异步问题
    return new Promise((resolve, reject) => {
        //在数据池中进行操作
        pool.query(sql, data, function (error, results, fields) {
            if (error) {
                reject(error.message)
            } else {
                resolve(results)
            }
        })
    })
}
