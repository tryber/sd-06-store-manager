const { UNPROCESSABLE_ENTITY } = require('../dictionary/statusCode');
const { 
  invalidName,
  quantityIsNotInteger,
  quantityIsNegative
} = require('../dictionary/errorMessages');

const name = (req, res, next) => {
  const { name } = req.body;
  const NAME_MIN_SIZE = 5;

  if (name.length < NAME_MIN_SIZE) 
    return res.status(UNPROCESSABLE_ENTITY).json({ err: invalidName});

  next();
};

const quantity = (req, res, next) => {
  const { quantity } = req.body;
  const ZERO = 0;

  if (!Number.isInteger(quantity)) 
    return res.status(UNPROCESSABLE_ENTITY).json({ err: quantityIsNotInteger });
  if (Number(quantity) <= ZERO) 
    return res.status(UNPROCESSABLE_ENTITY).json({ err: quantityIsNegative });
  
  next();
};

module.exports = { name, quantity };