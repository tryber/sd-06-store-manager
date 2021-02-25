const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/products', ProductsController);


app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT);
