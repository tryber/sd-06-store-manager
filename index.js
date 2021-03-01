const express = require('express');
const bodyParser = require('body-parser');

const ProductsController = require('./controller/ProductsController');
const SalesController = require('./controller/SalesController');

const app = express();

app.use(bodyParser.json());


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsController);
app.use('/sales', SalesController);

const PORT = 3000;

app.listen(PORT, () => console.log(`working, but don't push it... on PORT ${PORT} `));
