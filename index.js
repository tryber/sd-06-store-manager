const express = require('express');
const app = express();
const port = 3000;
const FAIL = 500;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const ProductsController = require('./controller/ProductsController');

app.use('/', ProductsController);

app.use((err, _req, res, _next) => {
  res.status(FAIL).json({ message: err.message });
});

app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Example app listening on ${port}!`));
