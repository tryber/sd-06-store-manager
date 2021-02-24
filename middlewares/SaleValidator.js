const { SalesModel } = require('../models');
const { ObjectId } = require('mongodb');

const status422 = 422;
const status404 = 404;
const minimumQnt = 0;

const saleIdExists = async (req, _res, next) => {
  const { id } = req.params;
  const sale = ObjectId.isValid(id) && await SalesModel.getById(id);
  if (!sale) {
    return next({
      statusCode: status404,
      message: {
        err: { code: 'not_found', message: 'Sale not found' }
      }
    });
  }
  next();
};

const saleDeleteById = async (req, _res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return next({
      statusCode: status422,
      message: {
        err: { code: 'invalid_data', message: 'Wrong sale ID format' }
      }
    });
  }
  next();
};

const saleValidator = async (req, _res, next) => {
  req.body.forEach((arr) => {
    if (arr.quantity <= minimumQnt || typeof arr.quantity !== 'number') {
      return next({
        statusCode: status422,
        message: {
          err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
        }
      });
    };
  });
  next();
};

module.exports = {
  saleIdExists,
  saleValidator,
  saleDeleteById,
};
