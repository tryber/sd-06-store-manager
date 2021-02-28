const express = require('express');
const productRouter = require('./src/routers/productRouter');
const bodyParser = require('body-parser');
const { sendError } = require('./src/utils/errorHandler');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use('/products', productRouter);
app.use((err, _req, res, _next) => {
  sendError(err, res);
});

app.listen(PORT);
