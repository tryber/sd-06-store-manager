const { ObjectId } = require('mongodb');
const produtoServices = require('../produtoServices');

const lengthNumberName = 5;
const statusNumberError = 422;
const numberZero = 0;

async function verifyNameExists(request, response, next) {
  const { name } = request.body;
  const existNameReturn = await produtoServices.findNameProductExist(name);
  if (existNameReturn)
    return response
      .status(statusNumberError)
      .json({ err: { code: 'invalid_data', message: 'Product already exists' } });
  next();
}

function verifyProducts(request, response, next) {
  const { name, quantity } = request.body;
  if (name.length < lengthNumberName)
    return response
      .status(statusNumberError)
      .json({
        err: { code: 'invalid_data',
          message: '"name" length must be at least 5 characters long' },
      });
  if (quantity < numberZero)
    return response
      .status(statusNumberError)
      .json({
        err: { code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1' },
      });
  if (quantity === numberZero)
    return response
      .status(statusNumberError)
      .json({
        err: { code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1' },
      });
  if (!Number.isInteger(quantity))
    return response
      .status(statusNumberError)
      .json({ err: { code: 'invalid_data', message: '"quantity" must be a number' } });
  next();
}

function verifyId(request, response, next) {
  try {
    const { id } = request.params;
    ObjectId(id);
    if (!id)
      return response
        .status(statusNumberError)
        .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    next();
  } catch (error) {
    response
      .status(statusNumberError)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
}
module.exports = {
  verifyId,
  verifyNameExists,
  verifyProducts,
};
