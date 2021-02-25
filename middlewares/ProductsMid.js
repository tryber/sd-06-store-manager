const { getByName, getById }  = require('../models/ProductsModel');
const { deleteProductService } = require('../service/ProductsService');
const { ObjectId } = require('mongodb');

const FIVE = 5;
const ZERO = 0;
const UNPROCESSABLE = 422;

const validateProduct = (req, res, next) => {

  const { name, quantity } = req.body;

  if (!name || name.length < FIVE) return res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  }
  });
      
  if (!quantity || quantity < ZERO || quantity === ZERO)  return res.status(UNPROCESSABLE)
    .json({ err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    }
    }); 

  if (!Number.isInteger(quantity)) return res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  }
  });

  next();
};

const validateName = async (req, res, next) => {
  const { name } = req.body;
  const result = await getByName(name);
  if(result) return res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data',
    message: 'Product already exists'
  }
  }); 
  next();
};

const validateId = async (req, res, next) => {
  const LIMITID = 24;
  const { id } = req.params;
  // Object.isValid(id)
  if(id.length < LIMITID) return res.status(UNPROCESSABLE)
    .json({ err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }});
  next();
};

module.exports = {
  validateProduct,
  validateName,
  validateId,
};