const { Router } = require('express');
const ProductsService = require('../service/ProductsService');

const router = Router();

const quatrocentosEVinteEDois = 422;
const duzentosEUm = 201;

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

module.exports = router;
