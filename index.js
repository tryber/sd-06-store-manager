const express = require('express');
const app = express();

const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const bodyParser = require('body-parser');
const { ProductsRouter } = require('./controller/products');
const { SalesRouter } = require('./controller/sales');

app.use(bodyParser.json());

app.use('/', ProductsRouter);

app.use('/', SalesRouter);

app.listen(port, () => console.log(`Listening to ${port}`));