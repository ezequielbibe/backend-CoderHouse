const express = require('express');
const fs = require('fs')

const app = express();

app.get('/products', async (req, res) => {
    const file = await fs.promises.readFile('../products.txt', 'utf-8');
    res.send(`${file}`);
})
app.get('/productRandom', async (req, res) => {
    const file = await fs.promises.readFile('../products.txt', 'utf-8');
    const array = JSON.parse(file);
    const productRandom = array[Math.floor(Math.random() * array.length)];
    res.send(`${JSON.stringify(productRandom, null, 2)}`);
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening in port ${PORT}`);
})