const express = require('express');
const parser = require('body-parser');
const productsController = require('./controller/productsController');

const app = express();

const port = 3000;
const sucess = 200;

app.get('/we', (_req, res) => {
  res.status(sucess).send('weeeeeee!');
});

app.use(parser.json());

app.use('/products', productsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('//', (_request, response) => {
  response.send();
});


let errorMessage = {
  'err': {
    'code': 'invalid_data',
    'message': ''
  }
};

app.use((err, _req, res, _next) => {
  const { status, message} = err;
  errorMessage.err.message = message;
  console.log('mensagem de erro é:', message);
  console.log('status de erro é:', status);
  return res.status(status).json(errorMessage);
});

// listen
app.listen(port, () => console.log('node weeeeee!'));
