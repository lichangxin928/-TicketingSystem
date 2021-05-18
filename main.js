const express = require('express');


const app = express();

app.listen(3000,function(){
    console.log('server is running.....');
})

app.engine('html',require('express-art-template'))

app.use('/public/',express.static('./public/'))
app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))

app.get('/',function(req,res){
    res.render('menu.html');
})

app.get('/user_login',function(req,res){
    res.render('index.html');
})
app.get('/forgot',function(req,res){
    res.render('forgot.html');
})
app.get('/sign-up',function(req,res){
    res.render('sign-up.html');
})
app.post('/form',function(req,res){
    const data = req.body;
    console.log(data);
    res.send(data);

})