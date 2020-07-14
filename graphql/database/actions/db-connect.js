const knex = require('../mysql')

knex.raw('show schemas')
    .then(res => console.log(res))