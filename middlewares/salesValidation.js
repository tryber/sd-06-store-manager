const { UNPROCESSABLE_ENTITY } = require('../dictionary/statusCode');
const {
  wrongIdOrInvalidQuantity
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

module.exports = {
  quantity,
};