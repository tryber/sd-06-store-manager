const Products = require('../models/products');
const { ObjectId } = require('mongodb');

const UNPROCESSABLEENTITY = 422;

const idValidation = async (req, res, next) => {
  const { id } = req.params;
  
  if(!ObjectId.isValid(id)) {
    return res.status(UNPROCESSABLEENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }

  const idExists = await Products.findById(id);

  if(!idExists) {
    return res.status(UNPROCESSABLEENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }

  next();
};

module.exports = {
  idValidation
};
