const express = require('express');
const bodyParser = require('body-parser');
const {
  createProducts,
  validateProduct,
  findProduct,
  findProducts,
  updateProduct,
  checkName,
  deleteProduct
} = require('./src/middlewares/Products');

const {
  createSale,
  getSales,
  getSingle,
  removeSale,
  updateSale,
} = require('./src/middlewares/Sales');

const app = express();

app.use(bodyParser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateProduct, checkName, createProducts);

app.get('/products/:id', findProduct);

app.put('/products/:id', validateProduct, updateProduct);

app.delete('/products/:id', deleteProduct);

app.get('/products', findProducts);


app.get('/sales', getSales);

app.get('/sales/:id', getSingle);

app.post('/sales', createSale);

app.put('/sales/:id', updateSale);

app.delete('/sales/:id', removeSale);


app.listen(PORT, () => console.log('App rodando na porta 3000'));