const { Router } = require('express');
const ProductsServices = require('../services/ProductsServices');

const router = new Router();

const statusCode = {
  OK: 200,
  UNPROCESSABLE: 422,
};


router.post('/', async (request, response) => {
  const { name, quantity } = request.body;
  
  const { code, err, product } = await ProductsServices.createNewProduct(name, quantity);
  
  // console.log('code', code);
  if (!product) return response.status(code).json({ err });
  
  response.status(code).json(product);
});

router.get('/', ProductsServices.getAllProducts);

router.get('/:id', ProductsServices.getById);

router.put('/:id', ProductsServices.updateProduct);

router.delete('/:id', ProductsServices.deleteProducts);

module.exports = router;