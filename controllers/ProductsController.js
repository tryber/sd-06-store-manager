const { Router } = require('express');
const ProductService = require('../services/ProductsService');
const ProductController = new Router();

const STATUS_422 = 422;
const STATUS_201 = 201;
const STATUS_200 = 200;
// const STATUS_404 = 404;

ProductController.post('/', async(request, response) => {
  const { name, quantity } = request.body;
  const veri = await ProductService.middlewareVerification(response, name, quantity);
  if (veri === null) {
    const add = await ProductService.addProd(name, quantity);
    return response.status(STATUS_201).json(add);
  }

});

ProductController.put('/:id', async(request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  const veri = await ProductService.middlewareVerification(response, name, quantity);
  if (veri === null) {
    const upDated = await ProductService.updateProd(id, name, quantity);
    return response.status(STATUS_200).json(upDated);
  }

});

ProductController.get('/:id', async(request, response) => {
  const { id } = request.params;
  const productId = await ProductService.getProdById(id);
  return productId._id ? response.status(STATUS_200)
    .json(productId):response.status(STATUS_422).json(productId);
});

ProductController.get('/', async (_request, response) => {
  const allProd = await ProductService.getProd();
  return response.status(STATUS_200).json({ products: allProd });
});

ProductController.delete('/:id', async(request, response) => {
  const { id } = request.params;
  const prod = await ProductService.getProdById(id);
  if (prod.err) return response.status(STATUS_422).json(prod);
  await ProductService.deleteProd(id);
  return response.status(STATUS_200).json(prod);
});

module.exports = ProductController;

// db.products.insertMany([{ name: "Mercedez sls 500", quantity: 12 }, { name: "Porche 911 carrera", quantity: 10 }]);
