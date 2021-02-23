const express = require('express');
const productController = require('./Controllers/productControllers');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', productController);

app.listen(port, () => console.log(`Store Manager running on port ${port}!`));
