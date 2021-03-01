const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const productController = require('./controllers/ProductController');
const saleController = require('./controllers/SaleController');

app.use('/products', productController);
app.use('/sales', saleController);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
