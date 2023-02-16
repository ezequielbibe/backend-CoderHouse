class ContainerMongo {
    constructor (model) {
        this.model = model
    }

    async getData () {
        try{
            const data =  await this.model.find({}, {"_id": 1, "__v": 0})
            return data
        }
        catch(error){
            console.log(`We has problems: ${error}`)
        }
    }
    async createData (data) {
        try{
            const newData = new this.model(data)
            await newData.save()
            console.log(`Data created`)
        }
        catch(error){
            console.log(`We has problems: ${error}`)
        }
    }
}

export default ContainerMongo