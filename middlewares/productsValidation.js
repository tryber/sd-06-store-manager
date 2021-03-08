const { ObjectId } = require('mongodb');
const { UNPROCESSABLE_ENTITY } = require('../dictionary/statusCode');
const { 
  invalidName,
  quantityIsNotInteger,
  quantityIsNegative,
  wrongIdFormat
} = require('../dictionary/errorMessages');

const name = (req, res, next) => {
  const { name } = req.body;
  const NAME_MIN_SIZE = 5;

  if (name.length < NAME_MIN_SIZE) 
    return res.status(UNPROCESSABLE_ENTITY).json({ err: invalidName });

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

const id = (req, res, next) => {
  const isValid = ObjectId.isValid(req.params.id);

  if(!isValid) return res.status(UNPROCESSABLE_ENTITY).json({ err: wrongIdFormat });

  next();
};

module.exports = { name, quantity, id };