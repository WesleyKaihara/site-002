const jwt = require('jsonwebtoken');
const secret = 'senha super secreta';

function geraToken(usuario){
    const payload = {
        id:usuario.get('id'),
        email:usuario.get('email'),
    };
    return jwt.sign(payload,secret);
}

function validaToken(token){
    try {
        return jwt.verify(token,secret);
    }
    catch(err){
        console.error(err);
        return null ; 
    }
}


exports.geraToken = geraToken
exports.validaToken = validaToken