import knex from 'knex'

const dbClientMariaDB = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        database: 'ecommerce',
    }
})

export default dbClientMariaDB;