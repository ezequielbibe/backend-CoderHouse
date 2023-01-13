import fs from 'fs'

const admin = Boolean(true)

const getProductsService = async (id) => {
    if(id) {
        const file = await fs.promises.readFile('./data/products.txt', 'utf-8')
        const array = JSON.parse(file)
        const product = array.find(prod => prod.id == id)
        return product
    }
    const file = await fs.promises.readFile('./data/products.txt', 'utf-8')
    const array = JSON.parse(file)
    return array
}
const addProductService = async (prod) => {
    const file = await fs.promises.readFile('./data/products.txt', 'utf-8')
    const array = JSON.parse(file)
    array.push(prod)
    await fs.promises.writeFile('./data/products.txt', JSON.stringify(array, null, 2))
}
const modifiquedProductsServices = async (products) => {
    await fs.promises.writeFile('./data/products.txt', JSON.stringify(products, null, 2))
}

export const productControllerGet = async (req, res) => {
    try{
        const { id } = req.params
        const productsArray = await getProductsService()
        if(id) {
            const product = await getProductsService(id)
            res.json(product)
            return
        }
        res.json(productsArray)
    }
    catch(error){
        console.log({ error })
    }
}

export const productControllerPost = async (req, res) => {
    try{
        if(!admin) {
            res.status(403).json({ "error": `route invalid. This route is for only admin`})
            return
        }
        const productsArray = await getProductsService()
        const prod = req.body
        const timeStamp = new Date().toLocaleString()
        const newProd = {id:(productsArray[productsArray.length - 1].id)+1, timeStamp, ...req.body}
        await addProductService(newProd)
        res.json(newProd)
    }
    catch(error) {
        console.log(error)
    }
}

export const productControllerPut = async (req, res) => {
    try{
        if(!admin) {
            res.status(403).json({ "error": `route invalid. This route is for only admin`})
        }
        const { id } = req.params
        const productsArray = await getProductsService()
        const timeStamp = new Date().toLocaleString()
        productsArray[productsArray.indexOf(productsArray.find(prod => prod.id === Number(id)))] = {id: Number(id), timeStamp, ...req.body}
        modifiquedProductsServices(productsArray)
        res.json({status: 200})
    }
    catch(error) {
        console.log(error)
    }
}

export const productControllerDelete = async (req, res) => {
    if(!admin) {
        res.status(403).json({ "error": `route invalid. This route is for only admin`})
    }
    const { id } = req.params
    const productsArray = await getProductsService()
    const newArray = productsArray.filter(prod => prod.id != id)
    await modifiquedProductsServices(newArray)
    res.json({ "status": 200 })
}