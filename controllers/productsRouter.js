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

router.get('/', async (_request, response) => {
  const allProducts = await productsServices.getAllProducts();
  response.status(statusCode.OK).json(allProducts);
});

// router.get('/:id', async (_request, response) => {
//   const allProducts = await productsServices.getAllProducts();
//   response.status(statusCode.OK).json(allProducts);
// });

router.delete('/', async (request, response) => {
  const { code, message } = await productsServices.deleteAllProducts();

  response.status(code).json(message);
});

module.exports = router;