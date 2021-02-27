const { Router }  = require('express') ;
const { addProduct,
  validateProduct,
  checkProduct,
  allProducts,
  productById,
  checkId,
  updateProduct
} = require('../services/productService');
const productRouter = new Router();
const Res201 = 201;
const Res200 = 200;


productRouter.post('/', validateProduct, checkProduct, async (request, response) => {
  await addProduct(request.body);
  return response.status(Res201).json(request.body);
});

productRouter.get('/', async (request, response) => {
  const productList = await allProducts();
  response.status(Res200).json({ products: productList });
});

productRouter.get('/:id', checkId, async (request, response) => {
  const product = await productById(request.params.id);
  response.status(Res200).json(product);
});

productRouter.put('/:id', checkId, validateProduct, async (request, response) => {
  const { name, quantity } = request.body;
  await updateProduct(request.params.id, name, quantity);  
  const updateProduct = await productById(request.params.id);
  response.status(Res200).json(updateProduct);
});

module.exports = productRouter;
