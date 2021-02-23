const express = require('express');
const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/hello', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`MyStoreApp active and listening on port ${port}!`));
