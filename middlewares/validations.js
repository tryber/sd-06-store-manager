const Products = require('../models/Products');

const error = 422;
const numberZero = 0;
const NumberFive = 5;
const lengthSize = 24;

const messageError = (string) => {
  return {
    err: {
      code: 'invalid_data',
      message: string,
    }
  };
};

const nameValidation = async (req, res, next) => {
  const { name } = req.body;
  const getProducts = await Products.getProducts();
  const failToFind = getProducts.filter((product) => product.name === name);

  if (failToFind.length > numberZero) 
    return res.status(error).json(messageError('Product already exists'));

  if (name.length < NumberFive) 
    return res.status(error)
      .json(messageError('"name" length must be at least 5 characters long'));

  next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity <= numberZero) 
    return res.status(error)
      .json(messageError('"quantity" must be larger than or equal to 1'));

  if (typeof quantity !== 'number') 
    return res.status(error)
      .json(messageError('"quantity" must be a number'));

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (id.length < lengthSize) 
    return res.status(error)
      .json(messageError('Wrong id format'));

  next();
};

module.exports = {
  nameValidation,
  quantityValidation,
  validateId,
};
