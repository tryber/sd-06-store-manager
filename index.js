const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const bodyParser = require('body-parser');

const app = express();

const OK = 200;
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/', (_req, res) => {
  res.status(OK).json({ok: true});
});

app.use('/products', productsController);

app.use('/sales', salesController);

app.listen(PORT);
