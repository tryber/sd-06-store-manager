const express = require('express');
const bodyParser = require('body-parser');

const ProductsRouter = require('./src/controllers/ProductsController');
const SalesRouter = require('./src/controllers/SalesController');

const app = express();

const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);

app.use('/sales', SalesRouter);


app.listen(port, () => console.log('Example app listening on port port!'));

