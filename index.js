const express = require('express');
const bodyParser = require('body-parser');
const { handleError } = require('./src/middlewares');
const app = express();
const port = 3000;
const productsRoutes = require('./src/routes/ProductsRouter');
const salesRoutes = require('./src/routes/SalesRouter');

// Trybe Code
app.get('/', (_request, response) => {
  response.send();
});

// My Code
app.use(bodyParser.json());

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);
app.use(handleError);

app.listen(port, () => console.log('Port Running'));
