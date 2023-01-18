const express = require('express')
const { engine } = require('express-handlebars')
const { Container } = require('./controller/index')
const { dbClientMariaDB, dbClientSqlite3 } = require('./config/connectToDb')

const app = express()
const PORT = 8080

const server = require('http').createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))

const a = new Container(dbClientMariaDB, 'products')
const b = new Container(dbClientSqlite3, 'chat')

let products = []
let chat = []

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/getData', async (req, res) => {
    try{
        products = await a.getData()
        chat = await b.getData()

        const data = {"products": products, "chat": chat}
        res.json(data)
    }
    catch(error){
        console.log('1');
    }
})

io.on('connection', async (client)=>{
    try{
        products = await a.getData()
        chat = await b.getData()
    
        console.log(`${client.id} is connected`)
    
        client.emit('products', products)
        client.on('addProduct',async data => {
            try{
                a.insertData(data)
                products = await a.getData()
                client.emit('products', products)
            }
            catch(error){
                console.log('2');
            }
        })
    
        client.emit('messageToChat', chat)
        client.on('addMessage', async data =>{
            try{
                b.insertData(data)
                chat = await b.getData()
                client.emit('messageToChat', chat)
            }
            catch(error){
                console.log('3');
            }
        })
    }
    catch(error){
        console.log('4');
    }

})

server.listen(PORT, ()=> console.log(`listening on port ${PORT}`))