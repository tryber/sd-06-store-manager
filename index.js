const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

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


//Sales Endpoints
app.get('/sales', salesController.ListAllSales);

app.get('/sales/:id', salesController.ListSaleById);

app.post('/sales', salesController.createNewSale);

app.put('/sales/:id', salesController.updateSaleById);

app.delete('/sales/:id', salesController.deleteSaleById);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
