const express = require('express');
const bodyParser = require('body-parser');
const CRUDController = require('./src/controllers/CRUDController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('./products', CRUDController);


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});



app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${port}`);
});
