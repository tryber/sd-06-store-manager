const express = require('express');

const bodyParser = require('body-parser');
const  produtoController  = require('./controller/produtoController'); // produtos vendas lembrar de verificar nomes

const app = express();
const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/products', produtoController);

app.listen(PORT, () => console.log('App listening on PORT %s', PORT));
