const express = require('express');
const bodyParse = require('body-parser') ;
const port = 3000;
const app = express();
const productController = require('./controllers/productController');


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use(bodyParse.json());

app.use('/products', productController);

app.listen(port, console.log('O pai ta on'));
