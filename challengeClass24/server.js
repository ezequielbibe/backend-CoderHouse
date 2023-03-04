import express from 'express'
import { engine } from 'express-handlebars'
import { createServer, get } from 'http'
import { Server } from 'socket.io'
import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import { connectToMariaDB, connectToMongoDB } from './config/index.js'
import { ContainerMongo, ContainerMariaDB } from './daos/index.js'
import Messages from './model/messagesModal.js'
import expressSession from 'express-session'
import mongoStore from 'connect-mongo'

const app = express()
const PORT = 8080

const server = createServer(app)
const io = new Server(server)


const mongoAtlas = 'mongodb+srv://coderhouse:nICi5z5tVOkztZu4@clusterdb.ewcn9ps.mongodb.net/?retryWrites=true&w=majority'
const mongoLocal = 'mongodb://0.0.0.0:27017/challengeClass22'


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    store: mongoStore.create({ 
        mongoUrl: mongoLocal,
        ttl: 600,
        autoRemove: 'interval',
        autoRemoveInterval: 0
    }),
    resave: false,
    saveUninitialized: false,
    secret: 'my-super-secret',
}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))

const mariaDB = new ContainerMariaDB(connectToMariaDB, 'products')
const mongoDb = new ContainerMongo(Messages)

let products = []

const middleWareSession = (req, res, next) => {
    if(req.session.userName) next()
    if(!req.session.userName) res.redirect('/login')
}

app.get('/', middleWareSession,(req, res) => {
    res.render('home', { userName: req.session.userName})
})
app.get('/login', (req, res) => {
    if(req.session.userName) {
        res.redirect('/')
        return
    }
    res.render('login')
})
app.post('/login', (req, res)=> {
    req.session.userName = req.body.userName
    console.log(req.session.userName)
    res.redirect('/')
})
app.get('/logout', (req, res)=> {
    res.render('logout', {userName: req.session.passport.user.email})
    req.session.destroy()
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
        const messages = await mongoDb.getData()
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
                await mongoDb.createData(data)
                const messagesActualizated = await mongoDb.getData()
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