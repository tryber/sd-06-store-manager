const express = require('express');
const productsRouter = require('./controller/ProductsController');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/products', productsRouter);
app.get('/', (_request, response) => response.send());

app.listen(port);