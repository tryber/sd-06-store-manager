const express = require('express');
const bodyParser = require('body-parser');
const {sendError} = require('./src/errorHandler/errorHandler');
const app = express();
const port = 3000;
const ProductsRouter = require('./src/productsRouter');
const salesRouter = require('./src/salesRouter');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);

app.use('/sales', salesRouter);

app.use((err, _req, res, _next) => {
  sendError(err, res);
});

app.listen(port, () => console.log(`Listening to port ${port}`));