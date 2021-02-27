const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);

app.listen(PORT, () => console.log('app listening!'));
