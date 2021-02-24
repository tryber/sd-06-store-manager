const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const SUCCESS = 200;
const DOOR = 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/products', (_request, response) => {
  response.status(422).send('vamoooos');
});

app.listen(DOOR,()=>console.log(`ON --- PORTA ---${DOOR}`));