const express = require('express');
const router = require('./source/router')
const app = express();
// 引入路由
app.use(router)
// express 导入 art-template
app.engine('html',require('express-art-template'))

app.use('/public/',express.static('./public/'))

app.listen(3000,function(){
    console.log('server is running.....');
})
