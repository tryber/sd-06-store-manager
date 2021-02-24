const MINIMUM_LENGTH = 5;
const MINIMUM_QUANTITY = 0;
const UNPROCESSABLE_ENTITY = 422;

const connection = require('../database');
const { ObjectId } = require('mongodb');

// const createProduct = async (name) => {
//   const nameProduct = await connection().then((db) =>
//     db.collection('products').findOne({ name })
//   );

//   if (nameProduct !== null) {
//     return nameProduct.name;
//   }
// };

const validateSales = async (req, res, next) => {
  const sales = req.body;

  sales.forEach(item => {
    if (item.quantity < MINIMUM_QUANTITY
      || item.quantity === MINIMUM_QUANTITY
      ||  typeof item.quantity !== 'number') {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }
  });

  next();
};

module.exports = validateSales;
