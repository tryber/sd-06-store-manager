const express = require('express');
const bodyParser = require('body-parser');
const {
  createProducts,
  validateProduct,
  findProduct,
  findProducts
} = require('./src/middlewares/');

const app = express();

app.use(bodyParser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateProduct, createProducts);

app.get('/products/:id', findProduct);

app.get('/products', findProducts);


app.listen(PORT, () => console.log('App rodando na porta 3000'));