const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/ProductsController');
const salesController = require('./controllers/SalesController');

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);
