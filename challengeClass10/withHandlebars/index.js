const express = require('express')
const { engine } = require('express-handlebars')
const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

const products = [ 
    {name: 'pen', price: 123, photoUrl: 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png'},
    {name: 'book', price: 321, photoUrl: 'https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-512.png'},
    {name: 'ruler', price: 456, photoUrl: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png'}
]
app.get('/', (req, res) => {
    res.render('form')
})

app.get('/products', (req, res) => {
    res.render('products', { products: products })
})

app.post('/products', (req, res) => {
    const { name, price, photoUrl } = req.body
    products.push({ name, price, photoUrl })
    res.redirect('/products')
})

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))