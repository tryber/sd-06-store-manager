const express = require('express');
const { expectedError } = require('./Middlewares/expectedError');
const productsController = require('./Controller/productsController');
const salesController = require('./Controller/salesController');
const bodyParser = require('body-parser');

const app = express();
const bell = 3000;

app.use(bodyParser.json());
app.use('/products', productsController);
app.use('/sales', salesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// const OK = 200;
// app.get('/', (_req, res) => {
//   res.status(OK).json({ok: true});
// });

app.use(expectedError);
app.listen(bell, () => console.log(`For whom the ${bell} tolls!`));
