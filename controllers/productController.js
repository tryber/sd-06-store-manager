const { Router }  = require('express') ;
const { addProduct,
  validateProduct,
  checkProduct,
  allProducts,
  productById,
  checkId,
  updateProduct,
  deleteProduct
} = require('../services/productService');
const productRouter = new Router();
const HTTP201 = 201;
const HTTP200 = 200;


productRouter.post('/', validateProduct, checkProduct, async (request, response) => {
  await addProduct(request.body);
  return response.status(HTTP201).json(request.body);
});

productRouter.get('/', async (request, response) => {
  const productList = await allProducts();
  response.status(HTTP200).json({ products: productList });
});

productRouter.get('/:id', checkId, async (request, response) => {
  const id = request.params.id;
  const product = await productById(id);
  response.status(HTTP200).json(product);
});

productRouter.put('/:id', checkId, validateProduct, async (request, response) => {
  const { name, quantity } = request.body;
  const id = request.params.id;
  await updateProduct(id, name, quantity);  
  const updatedProduct = await productById(id);
  return response.status(HTTP200).json(updatedProduct);
});

productRouter.delete('/:id', checkId, async (request, response) => {
  const id = request.params.id;
  const deletedProduct = await checkId(id);
  await deleteProduct(id);
  return response.status(HTTP200).json(deletedProduct);
});

module.exports = productRouter;
