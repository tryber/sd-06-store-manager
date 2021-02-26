const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./Controller/productsController');
const salesController = require('./Controller/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// products rotas
app.get('/products/:id', productsController.getById);
app.put('/products/:id', productsController.update);
app.delete('/products/:id', productsController.remove);
app.get('/products', productsController.getAll);
app.post('/products', productsController.create);

// sales rotas
app.get('/sales/:id', salesController.findById);
app.get('/sales', salesController.getAll);
app.post('/sales', salesController.create);

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
