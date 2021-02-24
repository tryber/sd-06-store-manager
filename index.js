const express = require('express');
const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => console.log(`working, but don't push it... on PORT ${PORT} `));
