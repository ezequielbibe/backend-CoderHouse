import ContainerMongoDB from "./containerMongoDB.js"
import ContainerFirebase from "./containerFireBase.js"
import Carts from '../model/cartsModel.js'
import Products from "../model/productsModel.js"

export const cartMongo = new ContainerMongoDB(Carts)
export const productsMongo = new ContainerMongoDB(Products)
export const cartFirebase = new ContainerFirebase('carts')
export const productsFirebase = new ContainerFirebase('products')