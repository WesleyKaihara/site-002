const bcrypt = require('bcryptjs');

function geraHash(texto){
    return bcrypt.hashSync(texto);
}
function comparaHash(texto,hash){
    return bcrypt.compareSync(texto,hash); 
}

exports.geraHash = geraHash
exports.comparaHash = comparaHash