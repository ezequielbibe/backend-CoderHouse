const { dbClientMariaDB, dbClientSqlite3 } = require('../config/connectToDb.js')

const createTableProducts = async () => {
    try{
        await dbClientMariaDB.schema.createTable('products', table => {
            table.increments('id')
            table.string('name', 15).notNullable()
            table.integer('price')
            table.string('photoUrl', 200).notNullable()
        })
        console.log(`Table products created`)

    }catch(error){
        console.log(`Create table products ERROR: ${error.message}`)
    }
}

const createTableChat = async () => {
    try{
        await dbClientSqlite3.schema.createTable('chat', table => {
            table.increments('id')
            table.string('author', 100).notNullable()
            table.string('text', 300).notNullable()
            table.string('date', 50).notNullable()
        })
        console.log(`Table chat created`)

    }catch(error){
        console.log(`Create table chat ERROR: ${error.message}`)
    }
}
createTableProducts()
createTableChat()

module.exports = { createTableProducts, createTableChat }