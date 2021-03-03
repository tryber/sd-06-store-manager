const { Router } = require('express');
// const rescue = require('express-rescue');
const { create, getByName, getAll, getById, update, remove } 
= require('../models/ProductsModel');
const { ObjectId } = require('mongodb');

const router = Router();
const CREATED = 201;
const UNPROCESSABLE= 422;
const OK = 200;
const NOT_FOUND = 400;
// Magic Number
const MIN_CHARS = 5;
const ZERO = 0;
const ID_LENGTH = 24;

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const findProduct = await getByName(name);
  // validations
  if (name.length <= MIN_CHARS) {
    return res.status(UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  } 
  if (findProduct) {
    return res.status(UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  if (quantity <= ZERO) {
    return res.status(UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      }
    });
  }  
  if (isNaN(quantity)) {
    return res.status(UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      }
    });
  }
  const { insertedId } = await create( name, quantity );
  const insertProduct = {
    _id: insertedId,
    name,
    quantity
  };

  return res.status(CREATED).json(insertProduct);
});

// Req 2
router.get('/', async (_req, res) => {
  const products = await getAll();

  return res.status(OK).json({products});
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // Validations
  if (id.length != ID_LENGTH) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }});
  }
  const item = await getById(id);

  if(item === null || item === {})
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });

  return res.status(OK).json(item);
});

// Req 3
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {name, quantity} = req.body;
  // Validations
  if (name.length <= MIN_CHARS) {
    return res.status(UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  if (quantity <= ZERO) {
    return res.status(UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      }
    });
  }  
  if (isNaN(quantity)) {
    return res.status(UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      }
    });
  }

  await update(id, name, quantity);
  const updateProduct = await getById(id);
  return res.status(OK).json(updateProduct);
});

// Req 4
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }});
  }
  const removeProduct = await getById(id);
  await remove(id);
  return res.status(OK).json(removeProduct);
});

module.exports = router;
