const socket = io()

socket.on('products', data => {
    let html = ''
    data?.forEach((prod, idx) => {
        html = `${html.length != 0 ? html : ''}
            <tr>
                <th scope="row">${idx + 1}</th>
                <td>${prod.name}</td>
                <td>${prod.price}</td>
                <td><img style="width: 50px; height: 50px" src=${prod.photoUrl}></img></td>
            </tr>`
    })
    document.getElementById('table-body').innerHTML = html
})

socket.on('messageToChat', data => {
    let html = ''
    data?.forEach((message) => {
        html = `${html.length != 0 ? html : ''}
            <li class="list-group-item"><span class="text-primary fw-bold">${message.author.name}</span> [<span class="text-danger"></span>]<span class="text-success">:${message.text}</span></li>`
    })
    document.getElementById('chat').innerHTML = html
})


const login = (event) => {
    event.preventDefault()
}
const addProduct = (event, addProductForm) => {
    event.preventDefault()
    const product = {
        name: addProductForm.name.value,
        price: addProductForm.price.value,
        photoUrl: addProductForm.photoUrl.value
    }
    socket.emit('addProduct', product)
}

const addMessage = (event, addMessageForm) => {
    event.preventDefault()
    const message = {
        author: {
            id: addMessageForm.email.value,
            name: addMessageForm.name.value,
            lastname: addMessageForm.lastname.value,
            age: addMessageForm.age.value,
            alias: addMessageForm.alias.value,
            avatar: addMessageForm.avatar.value,
        },
        text: addMessageForm.message.value,
    }
    socket.emit('addMessage', message)
}