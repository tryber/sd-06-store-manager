const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsControllers');
const salesController = require('./controllers/salesControllers');
const error = require('./middlewares/error');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

//Products
app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.delete('/products/:id', productsController.deleteById);

app.get('/products/get-name', productsController.getByName);

app.post('/products', productsController.createProduct);

app.put('/products/:id', productsController.updateProduct);

//Sales
app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.post('/sales', salesController.createSale);

app.put('/sales/:id', salesController.updateSale);

app.delete('/sales/:id', salesController.deleteSale, salesController.checkSale);

app.use(error);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
