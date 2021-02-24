const Products = require('../models/products');

const nameExistValidation = async(req, res, next) => {
  const { name, quantity } = req.body;
  
  const UNPROCESSABLEENTITY = 422;

  const productExists = await Products.findByName(name);
  
  if(productExists) {
    return res.status(UNPROCESSABLEENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  
  next();
};

module.exports = {
  nameExistValidation
};
