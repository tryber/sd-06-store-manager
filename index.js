const express = require('express');
const bodyParse = require('body-parser') ;
const port = 3000;
const app = express();
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use(bodyParse.json());

app.use('/products', productController);
app.use('/sales', salesController);

app.listen(port, console.log('O pai ta on'));
