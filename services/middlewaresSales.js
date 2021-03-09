const {
  createSales,
  findSalesByMongoId
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
    const idExists = await findSalesByMongoId(id);
    if(JSON.stringify(idExists) === id || !id) {
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

// const validateIdSalesExistsDel = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const [{_id}] = await findSalesByMongoId(id);
//     if(_id != id || !id || !_id) {
//       return res.status(status422).json({
//         err: {
//           code: 'invalid_data',
//           message: 'Wrong sale ID format'
//         }
//       });
//     };
//   } catch { return res.status(status422).json({
//     err: {
//       code: 'invalid_data',
//       message: 'Wrong sale ID format'
//     }
//   });
//   }
//   next();
// };

module.exports = {
  validateQuantityGreaterEqual0,
  validateQuantityNotString,
  validateIdSalesExists,
};
