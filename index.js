const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./src/controllers/ProductController');
const { error } = require('./src/middlewares');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use('/products', ProductsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(error);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
