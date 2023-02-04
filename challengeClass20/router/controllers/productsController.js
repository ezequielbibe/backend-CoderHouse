import { productsMongo } from '../../daos'

const admin = Boolean(true)

export const productControllerGet = async (req, res) => {
    try{
        const { id } = req.params
        if(id) {
            const product = await productsMongo.readOneData(id)
            res.json(product)
            return
        }
        const products = await productsMongo.readAllData()
        res.json(products)
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
        const timeStamp = new Date().toLocaleString()
        const newProd = { timeStamp, ...req.body }
        await productsMongo.createData(newProd)
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
        const timeStamp = new Date().toLocaleString()
        await productsMongo.updateData(id, { timeStamp, ...req.body })
        res.json({"status": 200})
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
    await productsMongo.deleteData(id)
    res.json({"status": 200})
}