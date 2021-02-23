const { Router } = require('express');
const Products = require('../models/Products');

const router = Router();

const SUCCESS = 200;
const Success201 = 201;
const Erro422 = 422;
const Cinco = 5;
const Zero = 0;


router.get('/', async (_req, res) => {
  const product = await Products.getAll();

  res.status(SUCCESS).json(product);
});

//
const validation = async(name, quantity) => {
  if (name.length < Cinco) {
    return {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    };
  }

  if (await Products.getByName(name)) {
    return {
      code: 'invalid_data',
      message: 'Product already exists'
    };
  }

  if (quantity <= Zero) {
    return {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    };
  }

  if (isNaN(quantity)) {
    return {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    };
  }

  return null;
};

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  //
  const err = await validation(name, quantity);
  if (err) return res.status(Erro422).json({ err });
  //
  const { inserteId } = await Products.create(name, quantity);

  const product = {
    id: inserteId,
    name,
    quantity
  };
  
  res.status(Success201).json(product);
});

module.exports = router;