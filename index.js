const express = require('express');
const rescue = require('express-rescue');

const productsController = require('./controllers/productsController');
const error = require('./middlewares/error');

const app = express();
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', rescue(productsController.createNewProduct));

app.get('/products', rescue(productsController.getAll));

app.get('/products/:id', rescue(productsController.getById));

app.use(error);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));