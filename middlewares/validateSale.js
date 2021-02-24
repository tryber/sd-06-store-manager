const Sales = require('../models/Sales');
const { ObjectId } = require('mongodb');

const ZERO = 0;
const STATUS422 = 422;
const STATUS404 = 404;

const validateSale = (req, res, next) => {
  const arraySales = req.body;

  for (let i = ZERO; i < arraySales.length; i+= 1) {
    if ( !Number(arraySales[i].quantity) ) return res.status(STATUS422).json({ 'err': {
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'
    } });

    if ( arraySales[i].quantity <= ZERO ) return res.status(STATUS422).json({ 'err': {
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'
    } });
  }

  return next();
};

const validateId = async (req, res, next) => {
  const { id } = req.params;

  if (! ObjectId.isValid(id)) return res.status(STATUS404).json({ 'err': {
    'code': 'not_found',
    'message': 'Sale not found'
  } }); 

  const sale = await Sales.getById(id);

  if (!sale) return res.status(STATUS404).json({ 'err': {
    'code': 'not_found',
    'message': 'Sale not found'
  } });

  return next();
};

module.exports = {
  validateSale,
  validateId
};