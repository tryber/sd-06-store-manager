const express = require('express');
const ProductController = require('./src/controllers/ProductController');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use('/products', ProductController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// middleware de erro
app.use((err, req, res, next) => {
  res.status(internalError).json({ message: 'Erro interno' });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
