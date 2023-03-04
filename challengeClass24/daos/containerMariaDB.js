class ContainerMariaDB { 
    constructor(config, table){
        this.config = config;
        this.table = table;
    }

    async getData () {
        try{
            const data = await this.config.from(this.table).select('*')
            return data
        }
        catch(error) {
            //console.log(`GET DATA ERROR: ${error.message}`)
        }
    }

    async insertData (data) {
        try{
            await this.config(this.table).insert(data)
            console.log(`data insert`)
        }
        catch(error) {
            console.log(`INSERT DATA ERROR: ${error.message}`)
        }
    }
}

export default ContainerMariaDB
