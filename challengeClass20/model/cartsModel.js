import mongoose from "mongoose"

const { Schema, model} = mongoose

const cartsSchema = new Schema({
    timeStamp: { type: String, required: true },
    products: { type: Array, required: true }
})

const Carts = model('Cart', cartsSchema)

export default Carts