const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const ProductsController = require('./controller/ProductsController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', ProductsController);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
