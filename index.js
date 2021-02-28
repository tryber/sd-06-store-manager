const express = require('express');
const bodyParser = require('body-parser');
const { createProducts, validateProduct } = require('./src/middlewares/');

const app = express();

app.use(bodyParser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateProduct, createProducts);

app.listen(PORT, () => console.log('App rodando na porta 3000'));