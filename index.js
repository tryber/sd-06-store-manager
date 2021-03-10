const express = require('express');
const rescue = require('express-rescue');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const error = require('./middlewares/error');
const productsValidation = require('./middlewares/productsValidation');
const salesValidation = require('./middlewares/salesValidation');

const app = express();
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', 
  productsValidation.name, 
  productsValidation.quantity,
  rescue(productsController.createNewProduct)
);

app.get('/products', 
  rescue(productsController.getAll)
);

app.get('/products/:id',
  productsValidation.id,
  rescue(productsController.getById)
);

app.put('/products/:id',
  productsValidation.name,
  productsValidation.quantity,
  rescue(productsController.updateProduct)
);

app.delete('/products/:id',
  productsValidation.id,
  rescue(productsController.deleteProduct)
);

app.post('/sales',
  salesValidation.quantity,
  rescue(salesController.createNewSale)
);

app.get('/sales',
  rescue(salesController.getAll)
);

app.get('/sales/:id',
  salesValidation.saleId,
  rescue(salesController.getById)
);

app.use(error);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));