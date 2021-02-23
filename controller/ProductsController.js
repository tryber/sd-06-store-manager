const { Router } = require('express');
const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');
const ProductsService = require('../service/ProductsService');

const router = Router();

const quatrocentosEVinteEDois = 422;
const duzentosEUm = 201;
const duzentos = 200;

router.post('/products', async(req, res) => {
  const { name, quantity } = req.body;

  if(!ProductsService.checkNameSize(name)) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }

  const productExists = await ProductsService.findProductByName(name);

  if(productExists) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }

  if(!ProductsService.checkQuantityLessThanZero(quantity)) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }

  if(!ProductsService.checkQuantityEqualZero(quantity)) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }

  if(!ProductsService.checkQuantityString(quantity)) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }

  await ProductsService.createProduct(name, quantity);

  const productCreated = await ProductsService.findProductByName(name);

  return res.status(duzentosEUm).json(productCreated);
});

router.get('/products', rescue (async(req, res) => {
  const allProducts = await ProductsService.findAllProducts();
  return res.status(duzentos).json({ products: allProducts });
}));

router.get('/products/:id', rescue (async(req, res) => {
  const { id } = req.params;


  if(!ObjectId.isValid(id)) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }

  const product = await ProductsService.findProductById(id);

  if(!product) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }

  return res.status(duzentos).json(product);
}));

router.put('/products/:id', rescue (async(req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  if(!ProductsService.checkNameSize(name)) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }

  if(!ProductsService.checkQuantityLessThanZero(quantity)) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }

  if(!ProductsService.checkQuantityEqualZero(quantity)) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }

  if(!ProductsService.checkQuantityString(quantity)) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }

  await ProductsService.updateProduct(id, name, quantity);

  const product = await ProductsService.findProductById(id);

  return res.status(duzentos).json({ _id: id, name, quantity });
}));

module.exports = router;
