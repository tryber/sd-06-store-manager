const { Router } = require('express');
const { ObjectId } = require('mongodb');
const Products = require('../models/Products');

const router = Router();

const SUCCESS = 200;
const Success201 = 201;
const Erro422 = 422;
const Cinco = 5;
const Zero = 0;


router.get('/', async (_req, res) => {
  const products = await Products.getAll();

  res.status(SUCCESS).json({products});
});

//
const validation = async (name, quantity) => {
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
  const { insertedId } = await Products.create(name, quantity);
  const product = {
    _id: insertedId,
    name,
    quantity
  };
  
  res.status(Success201).json(product);
});

// 2 
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if(!ObjectId.isValid(id)) {
    return res.status(Erro422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
  const product = await Products.getById(id);
  if(!product) {
    return res.status(Erro422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
  return res.status(SUCCESS).json(product);
});
// 2

// 3
const validation2 = async (name, quantity) => {
  if (name.length < Cinco) {
    return {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  const err = await validation2(name, quantity);
  if (err) return res.status(Erro422).json({ err });
  
  const product = await Products.update(id, name, quantity);
  return res.status(SUCCESS).json(product.value);
});
// 3

//4
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if(!ObjectId.isValid(id)) {
    return res.status(Erro422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
  const product = await Products.remove(id);
  return res.status(SUCCESS).json(product.value);
});
//4

module.exports = router;