const { ObjectId } = require('mongodb');
const Products = require('../models/Products');

const STATUS422 = 422;

const validateId = async (req, res, next) => {
  const { id } = req.params;

  if (! ObjectId.isValid(id)) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': 'Wrong id format'
  } }); 

  const product = await Products.getById(id);

  if (!product) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': 'Wrong id format'
  } });

  return next();
};

module.exports = { validateId };
