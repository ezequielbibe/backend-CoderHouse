import mongoose from "mongoose"

let isConnected

const connectToDB = async () => {
    if(!isConnected) {
        console.log(`Connection is ready`)
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommersChallengeClass20')
        isConnected = true
        return
    }
    console.log(`Connetion existing`)
}

export default connectToDB