const express = require('express');
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsController);

app.use('/sales', SalesController);

app.listen(port, () => console.log(`Executando na ${port}`));
