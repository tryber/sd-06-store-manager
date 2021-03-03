const express = require('express');
const bodyParser = require('body-parser');
const { products } = require('./src/controller/products');
const app = express();

const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


//const { SalesRouter } = require('./controller/sales');

app.use(bodyParser.json());

app.use('/', products);

//app.use('/', SalesRouter);

app.listen(port, () => {
  console.log(`Ouvindo na porta ${port}`);
});
