const express = require('express');
const ProductController = require('./controllers/ProductController');
const SalesController = require('./controllers/SalesController');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductController);
app.use('/sales', SalesController);

app.all('*', (req, res) => res.send({ error: 'This endpoint does not exist' }));

app.listen(port);