const express = require('express');
const rescue = require('express-rescue');

const productsController = require('./controllers/productsController');
const error = require('./middlewares/error');
const validation = require('./middlewares/validation');

const app = express();
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', 
  validation.name, 
  validation.quantity,
  rescue(productsController.createNewProduct)
);
app.get('/products', 
  rescue(productsController.getAll)
);
app.get('/products/:id',
  validation.productId,
  rescue(productsController.getById)
);
app.put('/products/:id',
  validation.name,
  validation.quantity,
  rescue(productsController.updateProduct)
);
app.delete('/products/:id',
  validation.productId,
  rescue(productsController.deleteProduct)
);

app.use(error);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));