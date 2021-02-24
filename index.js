const express = require('express')
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json());
const ProductController = require('./src/controllers/ProductController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// nao remova o endpoint acima

app.post('/products', rescue(ProductController.createProduct));

app.use((error, req, res, next) => {
  console.log(error);
  return res.status(500).json({ message: 'Erro Interno!' });
});

app.listen(port, () => console.log(`Example app listening on port port!`));
