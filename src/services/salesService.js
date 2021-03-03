const { ObjectId } = require('mongodb');

const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;
const one = 1;

async function setValidation (req, res, next) {
  const sale = req.body;
  sale.forEach((element) => {
    if(sale.quantity < one || typeof sale.quantity !== 'number') {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err:{
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      });
    };
  });
  next();
};

async function setValidationID (req, res, next) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(NOT_FOUND).json(
    {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    }
  );
  next();
};

module.exports = {
  setValidation,
  setValidationID,
};

