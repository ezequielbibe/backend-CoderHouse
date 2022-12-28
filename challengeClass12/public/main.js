const socket = io()

socket.on('products', data => {
    let html = ''
    data.forEach((prod, idx) => {
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
    data.forEach((message) => {
        html = `${html.length != 0 ? html : ''}
            <li><i>${message.author}</i>: ${message.text}</li>`
    })
    document.getElementById('chat').innerHTML = html
})

const addProduct = (addProductForm) => {
    const product = {
        name: addProductForm.name.value,
        price: addProductForm.price.value,
        photoUrl: addProductForm.photoUrl.value
    }
    socket.emit('addProduct', product)
}

const addMessage = (addMessageForm) => {
    const message = {
        author: addMessageForm.name.value,
        text: addMessageForm.message.value,
    }
    socket.emit('addMessage', message)
}