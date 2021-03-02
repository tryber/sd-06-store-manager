const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./src/controller/product');
const Sales = require('./src/controller/sales');
const app = express();
const PORT = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', Products);

app.use('/sales', Sales);

app.listen(PORT);
