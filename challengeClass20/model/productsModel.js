import mongoose from "mongoose"

const { Schema, model} = mongoose

const productsSchema = new Schema({
    timeStamp: { type: String,  required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, required: true },
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    stock: { type: Number, required: true }
})

const Products = model('Product', productsSchema)

export default Products