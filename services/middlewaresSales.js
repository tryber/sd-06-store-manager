const {
  createSales,
  findSalesByProduct
} = require('../models/querysSales');

const magicNumberzero = 0;
const status422 = 422;
const status404 = 404;

const validateQuantityGreaterEqual0 = (req, res, next) => {
  const [{ quantity }] = req.body;
  if(quantity < magicNumberzero || quantity === magicNumberzero) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  next();
};

const validateQuantityNotString = (req, res, next) => {
  const [{ quantity }] = req.body;
  const isString = typeof(quantity);
  if(isString === 'string') {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  next();
};

const validateIdSalesExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { id } = req.params;
    const idExists = await findSalesByProduct(id);
    if(JSON.stringify(idExists) === id || !_id || !id) {
      return res.status(status404).json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      });
    };
  } catch { return res.status(status404).json({
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  });
  }
  next();
};

module.exports = {
  validateQuantityGreaterEqual0,
  validateQuantityNotString,
  validateIdSalesExists
};
