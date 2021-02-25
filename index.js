const express = require('express');

const app = express();
const PORT = 3000;
const ERROR = 500;

const ProductController = require('./src/controllers/ProductController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// nao remova o endpoint acima

app.use('/products', ProductController);

app.use((error, req, res, next) => {
  console.log(error);
  return res.status(ERROR).json({ message: 'Erro Interno!' });
});

app.listen(PORT, () => console.log('Example app listening on port port!'));
