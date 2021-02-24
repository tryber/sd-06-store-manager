const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const productsController = require('./src/controllers/productsController');
const salesController = require('./src/controllers/salesController');

// Trybe Code

app.get('/', (_request, response) => {
  response.send();
});

// My Code

app.use(bodyParser.json());

app.use('/products', productsController);
app.use('/sales', salesController);

app.listen(port, () => console.log('Port Running'));
