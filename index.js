const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./src/controllers/ProductsController');
// const salesController = require('./src/controllers/SalesController');
const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// ________________________________________________________

app.use(bodyParser.json());

app.use('/products', ProductsController);

// app.use('/sales', salesController);

// ________________________________________________________

const PORT = 3000;

app.listen(PORT, () => console.log('running!'));
