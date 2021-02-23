const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ProductsRouter = require('./controllers/ProductsController');
const SalesRouter = require('./controllers/SalesController');

app.use(bodyParser.json());
const port = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);
app.use('/sales', SalesRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));