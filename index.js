const express = require('express');
const bodyParser = require('body-parser');

const controllerProduct = require('./controllers/controllerProduct');
const controllerSale = require('./controllers/controllerSale');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', controllerProduct);
app.use('/sales', controllerSale);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
