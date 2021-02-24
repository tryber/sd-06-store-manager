const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./controllers/productsRouter');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

const port = 3000;
app.listen(port, () => `listening to port: ${port}`);
