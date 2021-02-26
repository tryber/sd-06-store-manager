const express = require('express');
const app = express();
const PORT = 3000;
const { productsRouter } = require('./controllers/ProductsController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/products', productsRouter);

// app.use('/sales', SalesRouter);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
