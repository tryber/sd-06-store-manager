const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productsRouter = require('./routes/ProductsRoutes');

const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.listen(port, () => `listening to port: ${port}`);
