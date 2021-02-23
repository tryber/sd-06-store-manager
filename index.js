const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

const productsController = require('./controllers/productsController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);

app.listen(PORT, () => console.log('app listening!'));
