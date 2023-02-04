class ContainerMongoDB {
    constructor(model){
        this.model = model
    }

    async createData (data) {
        try{
            const newData = new this.model(data)
            await newData.save()
            console.log(`Data created`)
        }
        catch(error){
            console.log({ error })
        }
    }

    async readAllData () {
        try{
            const data = await this.model.find({})
            console.log(JSON.stringify(data, null, 2))
        }
        catch(error){
            console.log({ error })
        }
    }

    async readOneData (id) {
        try{
            const data = await this.model.findOne({ _id: id })
            console.log(JSON.stringify(data, null, 2))
        }
        catch(error){
            console.log({ error })
        }
    }
    
    async updateData (id, newData) {
        try{
            await this.model.findOneAndUpdate({ _id: id }, {$set: newData}, {new: true})
        }
        catch(error){
            console.log({ error })
        }
    }

    async deleteData (id) {
        try{
            await this.model.findOneAndDelete({ _id: id })
            console.log("deleted")
        }
        catch(error){
            console.log({ error })
        }
    } 
}

export default ContainerMongoDB