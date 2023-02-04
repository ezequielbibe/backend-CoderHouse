import { cartMongo } from '../../daos/index.js'

export const cartControllerGet = async (req, res) => {
    try{
        const { id } = req.params
        if(id) {
            const cart = await cartMongo.readOneData(id)
            res.json(cart)
            return
        }
        const timeStamp = new Date().toLocaleString()
        const newCart = {timeStamp, products: []}
        await cartMongo.createData(newCart)
        res.json({"status": 200, "idCart": await cartMongo()})
    }
    catch(error){
        console.log(error)
    }
}

export const cartControllerDelete = async (req, res) => {
    try{
        const { id } = req.params
        await cartMongo.deleteData(id)
        res.json({"status": 200})
    }
    catch(error){
        console.log(error)
    }
}

export const cartControllerGetProducts = async (req, res) => {
    try{
        const { id } = req.params
        const products =(await cartMongo.readOneData(id)).products
        res.json({ products })
    }
    catch(error){
        console.log(error)
    }
}

export const cartControllerPostProduct = async (req, res) => {
    try{
        const { id } = req.params
        await cartMongo.updateData(id, {products: [req.body]})
        res.json({"status": 200})
    }
    catch(error){
        console.log(error)
    }
}

export const cartControllerDeleteProduct = async (req, res) => {
    const { id, id_prod } = req.params
    await cartMongo.deleteData()
    res.json({"status": 200})
}