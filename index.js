const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./constrolers/ProductsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/products', ProductsController);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


app.listen(PORT, () => console.log('App listening on PORT %s', PORT));
