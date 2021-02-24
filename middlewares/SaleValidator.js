const { SalesModel } = require('../models');
const { ObjectId } = require('mongodb');

const status422 = 422;
const status404 = 404;
const minimumQnt = 0;

const saleIdExists = async (req, res, next) => {
  const { id } = req.params;
  const sale = await SalesModel.getById(id);
  if (!ObjectId.isValid(req.params.id) || !sale) return res.status(status404).json({
    err: { code: 'not_found', message: 'Sale not found' }
  });
  next();
};

const saleDeleteById = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(status422).json({
    err: { code: 'invalid_data', message: 'Wrong sale ID format' }
  });
  next();
};

const saleValidator = async (req, res, next) => {
  req.body.forEach((arr) => {
    if (arr.quantity <= minimumQnt || typeof arr.quantity !== 'number') {
      return res.status(status422).json({
        err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
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
