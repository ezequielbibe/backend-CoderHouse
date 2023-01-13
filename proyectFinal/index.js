import express from 'express'
import productsRouter from './router/productsRouter.js'
import cartRouter from './router/cartRouter.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

app.all("*",(req, res) => {
    const route  = req.params
    res.status(404).json({"error": -2, "description": `route ${route[0]} is invalid`})
})

app.listen(PORT, () => console.log(`Listening on port:${PORT}`))
