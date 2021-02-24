const { ObjectId } = require('mongodb');
const { getProductById } = require('../modules/productModules');

const zero = 0;
const twoHundredTwentyTwo = 422;

const validateSale = (req, res, next) => {
  req.body.forEach((item) => {
    const { quantity } = item;
    if (!quantity || quantity <= zero || typeof quantity !== 'number') {
      return res.status(twoHundredTwentyTwo).send({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }
  });

  next();
};

const validateId = async (req, res, next) => {
  req.body.forEach( async (item) => {
    const { productId } = item;
    const product = await getProductById(productId);
    if (!ObjectId.isValid(productId) || !product) {
      return res.status(twoHundredTwentyTwo).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }
  });

  next();
};

module.exports = {
  validateId,
  validateSale,
};
