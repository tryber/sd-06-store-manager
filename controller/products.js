const { Router } = require('express');
const productsModules = require('../modules/productsModules');
const { validateProduct, validateId } = require('../services');

const productsRouter = new Router();

const findSucess = 200;
const createSucess = 201;
const invalidData = 422;

productsRouter.post('/', validateProduct, async (req, res) => {
  await productsModules.createProduct(req.body);
  res.status(createSucess).json(req.body);
});

productsRouter.get('/', async (_req, res) => {
  const allProducts = await productsModules.getAllProducts();
  res.status(findSucess).json({ products: allProducts });
});

productsRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  
  const productFound =  await productsModules.getProductById(id);
  
  if (!productFound) {
    res.status(invalidData).json({ err:
      { code: 'invalid_data', message: 'Wrong id format'}
    });
  }

  res.status(findSucess).json(productFound);
});

module.exports = { productsRouter };
