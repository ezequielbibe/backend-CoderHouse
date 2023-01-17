const knex = require('knex')

const dbClientMariaDB = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        database: 'ecommerce',
    }
})
const dbClientSqlite3 = knex({
    client: 'sqlite3',
    connection: {filename: './DB/ecommerce.sqlite'}
})
module.exports = { dbClientMariaDB, dbClientSqlite3 }