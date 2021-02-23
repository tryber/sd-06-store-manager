const express = require('express');

const app = express();
const PORT = 3000;
const SUCCESS = 200;

app.get('/', (_req, res) => {
  res.status(SUCCESS).send('Hello node');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Tô na porta 3000'));
