const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bell = 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(bell, () => console.log(`For whom the ${bell} tolls!`));
