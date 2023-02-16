import { Schema, model } from "mongoose"


const messagesSchema = new Schema({
    author: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        age: { type: Number, required: true },
        alias: { type: String },
        avatar: { type: String, required: true }
    },
    text: { type: String, required: true }
})

const Messages = model('Message', messagesSchema)

export default Messages