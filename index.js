const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/ProductController');
const SalesController = require('./controllers/SalesController');
const port = 3000;
const app = express();

app.get('/', (_request, response) => {
  response.send();
});


app.use(bodyParser.json());

app.use('/products', ProductController);

app.use('/sales', SalesController);

app.listen(port, () => console.log('i can heaaarr youuu 3000'));
