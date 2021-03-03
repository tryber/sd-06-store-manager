const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controllers/products');
const sales = require('./controllers/sales');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);
app.use('/sales', sales);

app.listen(PORT);
