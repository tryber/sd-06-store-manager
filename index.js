const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsController);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
