const express = require('express');


const app = express();

app.listen(3000,function(){
    console.log('server is running.....');
})

app.engine('html',require('express-art-template'))

app.use('/public/',express.static('./public/'))

app.get('/',function(req,res){
    res.render('menu.html');
})

app.get('/user_login',function(req,res){
    res.render('user_login.html');
})