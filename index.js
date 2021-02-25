const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./src/controllers/ProductController');
const SalesController = require('./src/controllers/SalesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductController);

app.use('/sales', SalesController);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
