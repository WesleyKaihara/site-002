const createKnex  = require('knex');

const knex = createKnex({
    client:'sqlite3',
    debug:true,
    useNullAsDefault:true,
    connection:{
        filename:'./site002.sqlite3'
    }
});
const bookshelf = require('bookshelf')(knex);

const Usuario = bookshelf.model('Usuario',{
    tableName:'usuarios',
    requireFetch:false,
    hidden:[
        'senha'
    ],
});


exports.Usuario = Usuario
