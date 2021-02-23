const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');
const { validateProduct } = require('./middlewares/validateProduct');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.get('/', (req, res) => {
//   res.status(200).json({ok: true});
// });

app.use('/products', validateProduct, ProductsController);

app.listen(PORT, () => {console.log('TESTE');});