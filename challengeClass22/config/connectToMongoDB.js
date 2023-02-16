import mongoose from 'mongoose'

const connectToDB = async () => {
    try{
        if(mongoose.connection.readyState == 0) {
            await mongoose.connect('mongodb://127.0.0.1:27017/challengeClass22')
            return
        }
    } catch(error){
        console.log(`We has problems: ${error}`)
    }
}

export default connectToDB