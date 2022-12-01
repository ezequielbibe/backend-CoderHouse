const fs = require('fs')

class Container { 
    constructor(file) {
        this.file = file;
    }

    async save(obj) {
        try{
            const file = await fs.promises.readFile(this.file, 'utf-8');
            const array = JSON.parse(file);
            const getNewId = (array) => {
            let maxId = 0;
            for( let product of array) {
                if(maxId < product.id) maxId = product.id
            }
            return maxId + 1;
            }
            const newId = getNewId(array);
            array.push({...obj, id: newId});
            await fs.promises.writeFile(this.file, JSON.stringify(array, null, 2));

            return newId;

        }catch(error){
            console.log(`We had problems: \n ${error}`);
        }
    }

    async getById(id) {
        try{
            const file = await fs.promises.readFile(this.file, 'utf-8');
            const array = JSON.parse(file);

            return array.some(prod => prod.id === id) ? array.find(prod => prod.id === id) : null
        }catch(error){
            console.log(`We had problems: \n ${error}`);
        }
    }

    async getAll() {
        try{
            const file = await fs.promises.readFile(this.file, 'utf-8');
            const array = JSON.parse(file);

            return array
        }catch(error){
            console.log(`We had problems: \n ${error}`);
        }
    }

    async deleteById(id) {
        try{
            const file = await fs.promises.readFile(this.file, 'utf-8');
            const array = JSON.parse(file);
            if(array.some(prod => prod.id === id)) {
                const newArray = array.filter(prod => prod.id != id);
                await fs.promises.writeFile(this.file, JSON.stringify(newArray, null, 2));
                console.log(`The product with id: ${id} it was removed.`);
            } else {
                console.log(`I'm sorry! Not exist product with this id.`)
            }

        }catch(error){
            console.log(`We had problems: \n ${error}`);
        }
    }

    async deleteAll () {
        const array = []
        await fs.promises.writeFile(this.file, JSON.stringify(array, null, 2));

        console.log(`We removed all products in the list`)
    }
}

const newClass = new Container('../products.txt');

const examples = async () => {
    //console.log(await newClass.save({name: 'pen', price: 100, thumbnail: 'asd4'}));
    //console.log(await newClass.getById(2));
    //console.log(await newClass.getAll());
    //newClass.deleteById(4);
    //newClass.deleteAll();
}

examples();