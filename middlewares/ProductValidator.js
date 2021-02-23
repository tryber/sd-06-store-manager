const { StoreManagerModel } = require('../models');

const status422 = 422;
const minimumSize = 5;
const minimumQnt = 0;


const productValidator = async (req, res, next) => {
  const { name, quantity } = req.body;

  const nameExists = await StoreManagerModel.getByName(name);
  if (nameExists && name === nameExists.name) return res.status(status422).json({
    error: 'invalid_data', message: 'Product already exists'
  });
  if (name.length < minimumSize) return res.status(status422).json({
    error: 'invalid_data', message: '"name" length must be at least 5 characters long'
  });
  if (quantity <= minimumQnt) return res.status(status422).json({
    error: 'invalid_data', message: '"quantity" must be larger than or equal to 1'
  });
  if (typeof quantity !== 'number') return res.status(status422).json({
    error: 'invalid_data', message: '"quantity" must be a number'
  });

  next();
};

module.exports = {
  productValidator,
};
