const express = require('express');
const bodyParser = require('body-parser');

const controlProducts = require('./control/controlProducts');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/products', controlProducts);
app.use('/sales', controlProducts);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('Working...'));
