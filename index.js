const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');
const salesController = require('./controllers/SalesController');
const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', ProductsController);
app.use('/sales', SalesController);

app.listen(PORT, () => console.log('App listening on PORT %s', PORT));