const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use('/products', ProductsController);
app.use('/sales', SalesController);
//não retire esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.listen(PORT);
