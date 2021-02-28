const express = require('express');
const productsController = require('./controllers/productsController');

const app = express();


const PORT = 3000;
const SUCCESS = 200;

// Para o avaliador funcionar, não remover.
app.get('/', async (req, res) => {

});

app.use('/products', productsController);


app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
