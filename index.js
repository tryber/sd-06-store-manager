const express = require('express');
const bodyParser = require('body-parser');
const routerProducts = require('./controller/controllerProduct');
const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routerProducts);

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Só imprime qualquer coisa');
});
