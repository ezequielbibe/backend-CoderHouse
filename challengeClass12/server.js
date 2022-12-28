const express = require('express')
const { engine } = require('express-handlebars')
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

const products = [ 
    {name: 'pen', price: 123, photoUrl: 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png'},
    {name: 'book', price: 321, photoUrl: 'https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-512.png'},
    {name: 'ruler', price: 456, photoUrl: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png'}
]

const chat = [
    {author: 'Ezequiel', text: 'Hello people'},
    {author: 'Florencia', text: 'Hello Ezequiel!'}
]

app.get('/', (req, res) => {
    res.render('home')
})

io.on('connection', (client)=>{
    console.log(`${client.id} is connected`)

    client.emit('products', products)
    client.on('addProduct', data => {
        products.push(data)
        client.emit('products', products)
    })

    client.emit('messageToChat', chat)
    client.on('addMessage', data =>{
        chat.push(data)
        client.emit('messageToChat', chat)
    })
})

server.listen(PORT, ()=> console.log(`listening on port ${PORT}`))