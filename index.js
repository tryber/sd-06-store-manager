const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');

// const ProductsService = require('./service/ProductsService');
// const SUCCESS = 200;
// const NOP = 422;

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsController);

// app.post('/products', async (req, res) => {
//   const { name, quantity } = req.body;
//   console.log(name);
//   const productValidate = await ProductsService.validateProduct(name, quantity);
//   console.log(productValidate);
//   if(productValidate) return res.status(NOP).json({ message: productValidate});

//   const productCreated = ProductsService.createProductService(name, quantity);

//   res.status(SUCCESS).json(productCreated);
// });
app.listen(PORT);