// Referencia ao site: -->>
https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/#:~:text=Dotenv,composto%20de%20chaves%20e%20valores.
require('dotenv').config({
  path: process.env.NODE_ENV === 'development_env' ? '.env.dev' : '.env'
});
const app = require('express')();
const routes = require('./routes');
const log = require('./middlewares/logger');
const statusCode = require('./utils/errorCodes');

const PORT = process.env.PORT;
const bodyParser = require('body-parser');


app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(log);

app.use('/products', routes.productsController);

app.all('*', (_req, res) => {
  res
    .status(statusCode.NOT_FOUND)
    .json({message: 'Servidor não encontrado'});
});

app.listen(PORT, () => {
  console.log(`Projetinho tá rolando na porta: ${PORT}`);
});

