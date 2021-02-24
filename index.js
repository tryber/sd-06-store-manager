const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./controllers/productsRouter');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((req, _res, next) => {
  console.log({
    data: new Date(),
    method: req.method,
    router: req.originalUrl,
  });
  next();
});

app.use(bodyParser.json());

app.use('/products', productsRouter);

app.use((err, _req, res, _next) => res.send(`erro: ${err.message}`));

app.listen(PORT, () => console.log('running port', PORT));
