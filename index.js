const express = require('express');

const bodyParser = require('body-parser');
const ProductsRouter = require('./controllers/productsController');
const SalesRouter = require('./controllers/salesController');

const app = express();

const PORT = 3000;


app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', ProductsRouter);

app.use('/sales', SalesRouter);



app.listen(PORT);
