const express = require('express');
const session = require('express-session');

const port = 3000;
var path =require('path');   //manipular dados
const { ppid } = require('process');
const app = express();       //definir rotas

app.use(session({secret:'qwertyuiop1234567890'}));


app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use('/public',express.static(__dirname +'public'));
app.use('/static',express.static('static'));


app.set('views',path.join(__dirname,'/views'));

app.get('/',(req,res) => {
    res.render('index');
});

app.get('/login',(req,res) => {
    res.render('login');
}); 

app.get('/desenvolvimento',(req,res) =>{
    res.render('desenvolvimento');
});


app.listen(port,() => {
    console.log("servidor funcionando");
});