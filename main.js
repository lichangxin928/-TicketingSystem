const express = require('express');
const router_user = require('./source/router_user')
const router_ma = require("./source/router_ma")
const app = express();
// 引入路由
app.use(router_user)
app.use(router_ma)
// express 导入 art-template
app.set('views', [__dirname + '/views/user', __dirname + '/views/manage']);

app.engine('html',require('express-art-template'))

app.use('/public/',express.static('./public/'))

app.listen(3000,function(){
    console.log('server is running.....');
})
