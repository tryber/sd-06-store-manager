const { Router } = require('express');
const productsServices = require('../services/productsServices');

const router = new Router();

const statusCode = {
  OK: 200,
  UNPROCESSABLE: 422,
};


router.post('/', async (request, response) => {
  const { name, quantity } = request.body;
  
  const { code, err, product } = await productsServices.createNewProduct(name, quantity);
  
  // console.log('code', code);
  if (!product) return response.status(code).json({ err });
  
  response.status(code).json(product);
});

router.get('/', productsServices.getAllProducts);

router.get('/:id', productsServices.getById);

router.put('/:id', productsServices.updateProduct);

router.delete('/:id', productsServices.deleteProducts);

module.exports = router;