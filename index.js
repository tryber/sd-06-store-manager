const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);

app.use('/sales', salesController);

app.listen(port, () => console.log(`Listening to port ${port}`));
