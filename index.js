const express = require('express');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('');

app.listen(port, () => console.log(`Listening to port ${port}`));
