const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const ProductsController = require('./controller/ProductsController');
const SalesController = require('./controller/SalesController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', ProductsController, SalesController);

const quinhentos = 500;

// app.use((err, req, res, next) => {
//   res.status(quinhentos).json({ message: err.message });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
