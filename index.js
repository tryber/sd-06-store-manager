const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
// const salesController = require('./controllers/salesControllers');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

//Products Endpoints
app.get('/products', productsController.listAllProducts);

app.get('/products/:id', productsController.listProductById);

app.post('/products', productsController.addProduct);

app.put('/products/:id', productsController.updateProducts);

app.delete('/products/:id', productsController.deleteProductById);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
