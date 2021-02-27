const { Router }  = require('express') ;
const { addProduct,
  validateProduct,
  checkProduct
} = require('../services/productService');
const productRouter = new Router();
const Res201 = 201;

productRouter.post('/', validateProduct, checkProduct, async (request, response) => {
  await addProduct(request.body);
  return response.status(Res201).json(request.body);
});

module.exports = productRouter;
