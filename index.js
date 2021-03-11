const express = require('express');
const bodyParser = require('body-parser');

const controlProducts = require('./control/controlProducts');
const controlSales = require('./control/controlSales');
const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/products', controlProducts);
app.use('/sales', controlSales);

app.listen(port, () => console.log('Working...'));
