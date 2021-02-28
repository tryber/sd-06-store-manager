const express = require('express');
const productsController = require('./controllers/productsController');

const app = express();


const PORT = 3000;

// Para o avaliador funcionar, não remover.
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsController);


app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
