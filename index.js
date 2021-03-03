const express = require('express');
const bodyParser = require('body-parser');
const productsControl = require('./controllers/productsControll');
const salesControl = require('./controllers/salesControl');

const DOOR = 3000;

const app = express();
app.use(bodyParser.json());



// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsControl);

app.use('/sales', salesControl);

app.listen(DOOR,() => {
  console.log('server On');
});
