import fs from 'fs'

const getCartServices = async () => {
    const file = await fs.promises.readFile('./data/cart.txt', 'utf-8')
    const array = JSON.parse(file)
    return array
}
const modifiquedCartServices = async (array) => {
    await fs.promises.writeFile('./data/cart.txt', JSON.stringify(array, null, 2))
}

export const cartControllerGet = async (req, res) => {
    try{
        const cartArray = await getCartServices()
        const timeStamp = new Date().toLocaleString()
        const newCart = {id: (cartArray.length == 0 ? 1 : (cartArray[cartArray.length - 1].id)+1), timeStamp, products: []}
        cartArray.push(newCart)
        await modifiquedCartServices(cartArray)
        res.json({"status": 200, "idCart": newCart.id})
    }
    catch(error){
        console.log(error)
    }
}

export const cartControllerDelete = async (req, res) => {
    try{
        const { id } = req.params
        const cartArray = await getCartServices()
        const newCart = cartArray.filter(prod => prod.id != id)
        await modifiquedCartServices(newCart)
        res.json({"status": 200})
    }
    catch(error){
        console.log(error)
    }
}

export const cartControllerGetProducts = async (req, res) => {
    try{
        const { id } = req.params
        const cartArray = await getCartServices()
        const cart = cartArray.find(prod => prod.id == id)
        const products = cart.products
        res.json({ products })
    }
    catch(error){
        console.log(error)
    }
}

export const cartControllerPostProduct = async (req, res) => {
    try{
        const { id } = req.params
        const cartArray = await getCartServices()
        const cart = cartArray.find(prod => prod.id == id)
        cart.products.push(req.body)
        cartArray[cartArray.indexOf(cartArray.find(cart => cart.id == id))] = cart
        await modifiquedCartServices(cartArray)
        res.json({"status": 200})
    }
    catch(error){
        console.log(error)
    }
}

export const cartControllerDeleteProduct = async (req, res) => {
    const { id, id_prod } = req.params
    const cartArray = await getCartServices()
    const cart = cartArray.find(cart => cart.id == id)
    const products = cart.products.filter(prod => prod.id != id_prod)
    cart.products = products
    cartArray[cartArray.indexOf(cartArray.find(cart => cart.id == id))] = cart
    await modifiquedCartServices(cartArray)
    res.json({"status": 200})
}