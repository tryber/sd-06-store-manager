const express = require('express');

const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use('/products', productsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Server has been started.');
});
