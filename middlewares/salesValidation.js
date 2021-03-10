const { ObjectId } = require('mongodb');
const { UNPROCESSABLE_ENTITY, NOT_FOUND } = require('../dictionary/statusCode');
const {
  wrongIdOrInvalidQuantity, saleNotFound
} = require('../dictionary/errorMessages');

const quantity = (req, res, next) => {
  const saleProducts = req.body;
  const ZERO = 0;
  const isInteger = saleProducts.every((product) => Number.isInteger(product.quantity));
  const isPositive = saleProducts.every((product) => product.quantity > ZERO);


  if (!isInteger || !isPositive) 
    return res.status(UNPROCESSABLE_ENTITY).json({ err: wrongIdOrInvalidQuantity});

  next();
};

const saleId = (req, res, next) => {
  const isValid = ObjectId.isValid(req.params.id);
    
  if(!isValid) return res.status(NOT_FOUND).json({ err: saleNotFound });

  next();
};

module.exports = {
  quantity,
  saleId
};