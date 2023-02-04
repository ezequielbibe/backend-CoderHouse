import admin from 'firebase-admin'
import '../config/connectToDbFirebase.js'

class ContainerFirebase {
    constructor(collection) {
        this.collection = collection
    }
     
    async createData(data) {
        try{
            const db = admin.firestore()
            const query = db.collection(this.collection)
            const count = await query.get()
            await query.doc(String(count.size + 1)).set(data)
            console.log(`data created!`)
        }catch(error){
            console.log(`we has problems!: ${error}`)
        }
    }

    async readAllData() {
        try{
            const db = admin.firestore()
            const query = db.collection(this.collection)
            const querySnapshot = await query.get()

            if(querySnapshot.empty) {
                console.log('Collection empty')
            } else {
                querySnapshot.forEach(doc => {
                    console.log(JSON.stringify(doc.data(), null, 2))
                })
            }
        }catch(error){
            console.log(`we has problems!: ${error}`)
        }
    }

    async readOneData(id) {
        try{
            const db = admin.firestore()
            const query = db.collection(this.collection).doc(`${id}`)
            const item = (await query.get()).data()
            if(!item) {
                console.log(`we found nothing`)
            } else {
                console.log(item)
            }
        }catch(error){
            console.log(`we has problems!: ${error}`)
        }
    }

    async updateData(id, update) {
        try{
            const db = admin.firestore()
            const query = db.collection(this.collection).doc(`${id}`)
            await query.set(update, { merge: true})
            console.log('data updated!')
        }catch(error){
            console.log(`we has problems!: ${error}`)
        }
    }

    async deleteData(id) {
        try{
            const db = admin.firestore()
            const query = db.collection(this.collection).doc(`${id}`)
            await query.delete()

            console.log('data deleted!')
        }catch(error){
            console.log(`we has problems!: ${error}`)
        }
    }
}

export default ContainerFirebase