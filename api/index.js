require('dotenv').config();
const app = require('express')();
const routes = require('./routes');
const log = require('./middlewares/logger');
const statusCode = require('./utils/errorCodes');
const TRES_MIL = 3000;
const PORT = process.env.PORT || TRES_MIL;
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

