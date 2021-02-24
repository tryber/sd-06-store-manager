const { Router } = require('express');
const { ObjectId } = require('mongodb');
const productsModules = require('../modules/productsModules');
const { validateProduct, validateId } = require('../services');

const productsRouter = new Router();

const SUCESS = 200;
const createSucess = 201;
const invalidData = 422;

productsRouter.post('/', validateProduct, async (req, res) => {
  await productsModules.createProduct(req.body);
  res.status(createSucess).json(req.body);
});

productsRouter.get('/', async (_req, res) => {
  const allProducts = await productsModules.getAllProducts();
  res.status(SUCESS).json({ products: allProducts });
});

productsRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  
  const productFound =  await productsModules.getProductById(id);
  
  if (!productFound) {
    res.status(invalidData).json({ err:
      { code: 'invalid_data', message: 'Wrong id format'}
    });
  }

  res.status(SUCESS).json(productFound);
});

productsRouter.put('/:id', validateId, validateProduct, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  await productsModules.updateProduct(id, name, quantity);

  const productUpdated = {
    _id: ObjectId(id),
    name,
    quantity,
  };

  res.status(SUCESS).json(productUpdated);
});

module.exports = { productsRouter };
