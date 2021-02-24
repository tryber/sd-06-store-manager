const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const { productsRouter } = require('./controller/products');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/products', productsRouter);

app.listen(port, () => console.log(`Listening to port ${port}`));
