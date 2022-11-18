class User { 
    constructor(name, lastname, books, pets) {
        this.name = name;
        this.lastname = lastname;
        this.books = books;
        this.pets = pets;
    }

    getFullName () {
        let fullname = `${this.name} ${this.lastname}`;
        return fullname;
    }

    addPets(newPet) {
        this.pets.push(newPet)
    }

    countPets() {
        return this.pets.length;
    }

    addBooks(name, author) {
        let book = {name, author}
        this.books.push(book)
    }

    getBookNames() {
        const list = [];
        this.books.forEach((book) => {
            list.push(book.name)
        })
        return list;
    }
}

const person = new User('Ezequiel', 'Bibe', [{name: 'Eloquent JavaScript', author: 'Marijn Haverbeke'}, {name: 'JavaScript The Good Parts', author: 'Douglas Crockford'}, {name: 'How JavaScript Works', author: 'Douglas Crockford'}], ['Venuns', "Kenai"])
console.log(person.getFullName());
console.log(person.pets);
person.addPets('Bebe');
console.log(person.pets);
console.log(person.countPets());
console.log(person.books)
person.addBooks('Maradona', 'Messi');
console.log(person.books)
console.log(person.getBookNames());