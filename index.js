const express = require('express');
const bodyParser = require('body-parser');
const ProductsRouter = require('./controllers/Products');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use('/products', ProductsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Rodando na 3k!'));
