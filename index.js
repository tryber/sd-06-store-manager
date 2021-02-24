const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Products
const ProductsController = require('./src/controller/ProductsController');
app.use('/products', ProductsController);

// Sales
const SalesController = require('./src/controller/SalesController');
app.use('/sales', SalesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
