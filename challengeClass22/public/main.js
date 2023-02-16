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

socket.on('messageToChat', async data => {
    const author = new normalizr.schema.Entity('authors')
    const message = new normalizr.schema.Entity('messages', {
        author: author,
    })
    const chat = new normalizr.schema.Entity('chats', {
        mensajes: [message],
    })
    const denormalizeData = new normalizr.denormalize(data.result, chat, data.entities)

    let html = ''
    const avg = `(compression: %${(100-(((JSON.stringify(data).length) * 100) / (JSON.stringify(denormalizeData).length))).toFixed(2)})`
    denormalizeData.mensajes?.forEach((message) => {
        html = `${html.length != 0 ? html : ''}
            <li class="list-group-item"><span class="text-primary fw-bold">${message.author.name}</span> [<span class="text-danger"></span>]<span class="text-success">:${message.text}</span></li>`
    })
    document.getElementById('chat').innerHTML = html
    document.getElementById('avg').innerHTML = avg
})

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