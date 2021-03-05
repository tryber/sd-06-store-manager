const express = require('express');
const bodyParser = require('body-parser');

const product = require('./src/controllers/productController');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', product);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
