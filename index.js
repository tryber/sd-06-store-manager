const express = require('express');
const bodyParser = require('body-parser');
const { productsControl, salesControl } = require('./controllers/');

const app = express();
const SUCCESS = 200;
const DOOR = 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/products', productsControl);

app.use('/sales', salesControl);

app.listen(DOOR,()=>console.log(`ON --- PORTA ---${DOOR}`));
