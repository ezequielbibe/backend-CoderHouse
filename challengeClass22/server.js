import express from 'express'
import { engine } from 'express-handlebars'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import { connectToMariaDB, connectToMongoDB } from './config/index.js'
import { /*ContainerMongo,*/ ContainerMariaDB } from './daos/index.js'
/*import Messages from './model/messagesModal.js'*/
import { normalize, schema } from 'normalizr'
import ContainerFirebase from './daos/containerFireBase.js'


const app = express()
const PORT = 8080

const server = createServer(app)
const io = new Server(server)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))

export const firebase = new ContainerFirebase('messages')
const dataNormalizated = async () => {
    const messages = await firebase.readAllData()
    const author = new schema.Entity('authors')
    const message = new schema.Entity('messages', {
        author: author,
    })
    const chat = new schema.Entity('chats', {
        mensajes: [message],
    })

    const normalizedData = normalize( {id:'messagesCenter', mensajes: messages}, chat)
    return normalizedData
}
const mariaDB = new ContainerMariaDB(connectToMariaDB, 'products')
// const mongoDb = new ContainerMongo(Messages)
let products = []

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/getData', async (req, res) => {
    try{
        products = await a.getData()
        const data = {"products": products}
        res.json(data)
    }
    catch(error){
        console.log('1');
    }
})
app.get('/api/productos-test', (req, res) => {
    faker.locale = 'es'
    const data = Array.from({ length: 5 }).map(()=>({
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.product(),
        price: faker.commerce.price(100, 1000, 0),
        photoUrl: faker.image.imageUrl()
    }))
    res.render("table2", { products: data})
})

io.on('connection', async (client)=> {
    try{
        console.log(`${client.id} is connected`)

        products = await mariaDB.getData()
        client.emit('products', products)

        await connectToMongoDB()
        const messages = await dataNormalizated()
        client.emit('messageToChat', messages)
        await mongoose.disconnect()


        client.on('addProduct',async data => {
            try{
                a.insertData(data)
                products = await a.getData()
                client.emit('products', products)
            }
            catch(error){
                console.log(`We has problems1: ${error}`)
            }
        })
        client.on('addMessage', async data =>{
            try{
                await connectToMongoDB()
                await firebase.createData(data)
                const messagesActualizated = await dataNormalizated()
                await mongoose.disconnect()
                client.emit('messageToChat', messagesActualizated)
            }
            catch(error){
                console.log(`We has problems: ${error}`)
            }
        })
    }
    catch(error){
        console.log(`We has problems: ${error}`)
    }

})

server.listen(PORT, ()=> console.log(`listening on port ${PORT}`))