const salesModules = require('../modules/salesModules');
const { ObjectId } = require('mongodb');

const maxLength = 5;
const ZERO = 0;
const invalidData = 422;

const productExists = async (req, res, next) => {
  const { name } = req.body;
  const allProducts = await productsModules.getAllProducts();

  if (allProducts.find((product) => product.name === name) !== undefined) {
    return res.status(invalidData).json( { err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }});
  };

  next();
};

const validateSales = async (req, res, next) => {
  const sales = req.body;

  sales.forEach((sale) => {
    if (sale.quantity <= ZERO || typeof sale.quantity !== 'number') {
      return res.status(invalidData).json( { err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }});
    }
  });

  next();

};

// const validateId = async (req, res, next) => {
//   const { id } = req.params;
//   if (!ObjectId.isValid(id)) return res.status(invalidData).json({
//     err: {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     },
//   });

//   next();
// };

module.exports = {
  validateSales,
};
