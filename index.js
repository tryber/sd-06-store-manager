const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./Controller/productsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', productsController.getById);
app.put('/products/:id', productsController.update);
app.get('/products', productsController.getAll);
app.post('/products', productsController.create);

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
