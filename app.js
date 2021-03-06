const express = require('express');
const Joi = require('joi')
const modelos = require('./modelos')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const criptografia = require('./helpers/criptografia');
const jwt = require('./helpers/jwt');

const port = 3000;
var path =require('path');   //manipular dados
const app = express();       //definir rotas

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use('/static',express.static('static'));
app.use('/views',express.static('views'));


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
//-----------------------------------------------
function validacaoCadastro(request, response, next) {
    const schema = Joi.object({
      nome: Joi.string().min(1).max(200).required(),
      email: Joi.string().min(1).max(200).required(),
      senha: Joi.string().min(6).max(80).required(),
    });
    const resultado = schema.validate(request.body);
    if (resultado.error) {
      response.status(400).json(resultado.error);
    } else {
      next();
    }
  }
//--------------------------------------------------
app.post('/cadastro', validacaoCadastro, async function(req, res, next) {
    const usuarioExistente = await modelos.Usuario
      .where('email','=', req.body.email)
      .fetch();
    if (usuarioExistente) {
      res.status(400).json({
        mensagem: 'O endereço de e-mail já está cadastrado'
      });
      return;
    }
    
    const usuario = new modelos.Usuario({
      nome: req.body.nome,
      email: req.body.email,
      senha: criptografia.geraHash(req.body.senha),
    });
  
    const retorno = await usuario.save();
    res.status(201).json(retorno);
  });
//------------------------------------------------------
function validaLogin(req,res,next){
    const schema = Joi.object({
        email:Joi.string().min(1).max(200).required(),
        senha:Joi.string().min(6).max(80).required(),
    });
    const resultado = schema.validate(req.body);
    if(resultado.error){
        res.status(400).json(resultado.error);
    }
    else{
        next();
    }
}

//------------------------------------------------------
app.post('/login', validaLogin, async function (req, res) {
  const usuarioExistente = await modelos.Usuario
    .where('email', '=', req.body.email)
    .fetch();
  
  if (usuarioExistente) {
    const senhaEstaCorreta = criptografia.comparaHash(req.body.senha, usuarioExistente.get('senha'))
    if (senhaEstaCorreta) {
      res.render('logado');
    } else {
      res.status(400).json({
        mensagem: 'As credenciais são inválidas',
      });
    }
    // res.json(usuarioExistente);
    // return;
  } else {
    res.status(400).json({
      mensagem: 'As credenciais são inválidas',
    });
  }
});



app.listen(port,() => {
    console.log("servidor funcionando");
});