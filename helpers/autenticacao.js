const jwt = require('./jwt');
const modelos = require('../modelos');

async function autenticacao(req, res, next) {
  const token = req.headers.token;
  const payload = jwt.validaToken(token);

  if (payload) {
    // SELECT * FROM usuarios WHERE id = 10
    const usuario = await modelos.Usuario
      .where('id', payload.id)
      .fetch();
    
    if (usuario) {
      req.usuario = usuario;
      next();
    } else {
      res.status(401).json({
        mensagem: 'Você não tem autorização para acessar esta página'
      });
    }
  } else {
    res.status(401).json({
      mensagem: 'Você não tem autorização para acessar esta página'
    });
  }
}

module.exports = autenticacao;