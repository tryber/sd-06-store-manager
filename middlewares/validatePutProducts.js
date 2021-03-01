const { updateProduct, searchForProductId } = require('../models/productsModel');
const {
  nameIsValid,
  quantityIsNumber,
  quantityIsLessThanZero,
  quantityIsEqualToZero,
} = require('../Services/validations');

// env
const SUCCESS = 200;
const ERROR422 = 422;

const validatePutProducts = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  if(!nameIsValid(name)) {
    return res.status(ERROR422).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long'
        }
      }
    );
  }

  if(quantityIsLessThanZero(quantity)) {
    return res.status(ERROR422).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be larger than or equal to 1'
        }
      }
    );
  }

  if(quantityIsEqualToZero(quantity)) {
    return res.status(ERROR422).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be larger than or equal to 1'
        }
      }
    );
  }

  if(!quantityIsNumber(quantity)) {
    return res.status(ERROR422).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be a number'
        }
      }
    );
  }

  await updateProduct(id, name, quantity);
  res.status(SUCCESS).json(await searchForProductId(id));

  next();
};


module.exports = {
  validatePutProducts,
};
