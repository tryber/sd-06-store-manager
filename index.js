const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const status404 = 404;
const status200 = 200;

// const rescue = require('express-rescue');
const connection = require('./models/connection');

const productRouter = require('./controllers/rotaProduct');
const salesRouter = require('./controllers/rotaSales');
const teste = require('./models/teste');

const port3000 = 3000;
const port = parseInt(process.env.PORT, 10) || port3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// ------------------------------------------------------


app.use('/teste', async (req, res) => {
  const produtos = await teste.getAll();
  res.status(status200).json(produtos);
});

app.use('/products', productRouter);

app.use('/sales', salesRouter);

app.all('*', (_req, res) => { res.status(status404).json({ 
  message: 'Rota não Encontrada'});
});

app.listen(port, () => console.log(`Example app listening on ${port}!`));
