const express = require('express');
const app = express();
const PORT = 3000;

const controller = require('./controllers/controller');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controller.getAllProducts);
app.get('/products/:id', controller.findByIdProducts);
app.post('/products', controller.createProduct);
app.put('/products/:id', controller.updateProduct);
app.delete('/products/:id', controller.deleteProduct);
app.post('/sales', controller.quantitySold, controller.createSales);
app.get('/sales', controller.getAllSales);
app.get('/sales/:id', controller.findSalesById);
// app.put('/sales/:id', controller.updateSale);
app.delete('/sales/:id', controller.deleteSale);

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
