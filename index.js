const express = require('express');
const productsController = require('./controllers/products_controller');
const salesController = require('./controllers/sales_controller');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/products', productsController);
app.use('/sales', salesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT);
