const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');

const app = express();

const LOCALHOST_PORT = 3000;
const PORT = process.env.PORT || LOCALHOST_PORT;
const UNPROCESSABLE_ENTITY = 422;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsController);
app.use('/sales', SalesController);

app.use((error, request, response, next) => {
  response.status(UNPROCESSABLE_ENTITY).json(error);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
