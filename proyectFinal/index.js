import express from 'express'

const admin = Boolean(true)

const PORT = 8080
const app = express()
const productsRouter = express.Router()
const cartRouter = express.Router()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

productsRouter.get('/:id', (req, res) => {
    const { id } = req.params

    res.json({ id })
})
productsRouter.post('/', (req, res) => {
    if(!admin) {
        res.status(403).json({ "error": `route invalid. This route is for only admin`})
    }
    const prod = req.body
    const timeStamp = new Date().toLocaleString()
    res.json({"id": 1, timeStamp, ...prod})
})
productsRouter.put('/:id', (req, res) => {
    if(!admin) {
        res.status(403).json({ "error": `route invalid. This route is for only admin`})
    }
    const { id } = req.params

    res.json({ id, "hecho": "si"})
})
productsRouter.delete('/:id', (req, res) => {
    if(!admin) {
        res.status(403).json({ "error": `route invalid. This route is for only admin`})
    }   
    const { id } = req.params

    res.json({ id, "deleted": "si"})
})

cartRouter.get('/', (req, res) => {
    res.json({"msg": "tu id es 1"})
})
cartRouter.delete('/:id', (req, res) => {
    const { id } = req.params

    res.json({"msg": `el prod con el id ${id} is deteled`})
})
cartRouter.get('/:id/products', (req, res) => {
    const { id } = req.params
    res.json({"msg": `estos son los elementos del carrito ${id}`})
})
cartRouter.post('/:id/products', (req, res) => {
    const { id } = req.params

    res.json({"msg": `el prod con el id ${id} is deteled`})
})
cartRouter.delete('/:id/productos/:id_prod', (req, res) => {
    const { id, id_prod } = req.params
    
    res.json({"jeje":"jeje"})
})

app.all("*",(req, res) => {
    const route  = req.params
    res.status(404).json({"error": -2, "description": `route ${route[0]}`})
})

app.listen(PORT, () => console.log(`Listening on port:${PORT}`))
