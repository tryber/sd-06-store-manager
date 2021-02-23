const Products = require('../models/Products');

const STATUS422 = 422;
const NAMELENGTH = 5;
const ZERO = 0;

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  if ( name.length < NAMELENGTH ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': '\"name\" length must be at least 5 characters long'
  } });

  if ( await Products.checkName(name) ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': 'Product already exists'
  } });
  
  if ( quantity <= ZERO ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': '\"quantity\" must be larger than or equal to 1'
  } });

  if ( !Number(quantity) ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': '\"quantity\" must be a number'
  } });

  return next();
};

const validateProductUpdate = async (req, res, next) => {
  const { name, quantity } = req.body;

  if ( name.length < NAMELENGTH ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': '\"name\" length must be at least 5 characters long'
  } });
  
  if ( quantity <= ZERO ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': '\"quantity\" must be larger than or equal to 1'
  } });

  if ( !Number(quantity) ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': '\"quantity\" must be a number'
  } });

  return next();
};

module.exports = {
  validateProduct,
  validateProductUpdate
};
