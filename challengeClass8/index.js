const express = require('express');
const { Router } = express;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const productsRouter = Router();
app.use('/api/products', productsRouter);
app.use(express.static('public'));
const PORT = 8080;
const products = [
    {
      name: "Escuadra",
      price: 123.45,
      thumbnail: "asd1",
      id: 1
    },
    {
      name: "Calculadora",
      price: 234.56,
      thumbnail: "asd2",
      id: 2
    },
    {
      name: "Globo Terraqueo",
      price: 345.67,
      thumbnail: "asd3",
      id: 3
    }
]

productsRouter.get('/', (req, res)=> {
    res.json(products);
});

productsRouter.get('/:id', (req, res)=>{
    const { id } = req.params;
    if(!products.some(prod => prod.id === Number(id))){ 
        res.json({ error : 'producto no encontrado' });
        return
    }
    const result = products.filter(prod => prod.id == id);
    res.json(result);
});

productsRouter.post('/', (req, res)=> {
    const newProduct = {...req.body, id:(products[products.length - 1].id)+1}
    products.push(newProduct);
    res.json(newProduct);
});

productsRouter.put('/:id', (req, res)=> {
    const { id } = req.params;
    const { modifiedProduct } = req.body;
    if(!products.some(prod => prod.id === Number(id))){ 
        res.json({ error : 'producto no encontrado' });
        return
    }
    products[products.indexOf(products.find(prod => prod.id === Number(id)))] = {...modifiedProduct, id: Number(id)}
    res.json({status: 'actualizated'});
})

productsRouter.delete('/:id', (req, res)=> {
    const { id } = req.params;
    if(!products.some(prod => prod.id === Number(id))){ 
        res.json({ error : 'producto no encontrado' });
        return
    }
    console.log(Number(id))
    const newArray = products.filter(prod => prod.id != id);
    products.length = 0;
    newArray.forEach(prod => {
        products.push(prod);
    })
    res.json(products);
})


app.listen(PORT, ()=> {
    console.log(`We are ready! listening in port: ${PORT}`);
})

