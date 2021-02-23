const express = require('express');
const bodyParsser = require('body-parser');
const { managerController } = require('./controller');

const app = express();
const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParsser.json());
app.use('/manager', managerController);

app.listen(PORT, () => console.log('App listening on PORT %s', PORT));
