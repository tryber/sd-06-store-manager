const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./src/controllers/ProductController');
const SalesController = require('./src/controllers/SalesController');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use('/products', ProductsController);
app.use('/sales', SalesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(` Ouvindo na porta ${PORT}!`));