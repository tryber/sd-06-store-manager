const { ObjectId } = require('mongodb');
const produtoServices = require('../produtoServices');
const salesServices = require('../salesServices');

const lengthNumberName = 5;
const statusNumberError = 422;
const statusError = 404;
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
    return response.status(statusNumberError).json({
      err:
      { code: 'invalid_data',
        message: '"name" length must be at least 5 characters long' },
    });
  if (quantity < numberZero)
    return response.status(statusNumberError).json({
      err:
      { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    });
  if (quantity === numberZero)
    return response.status(statusNumberError).json({
      err:
      { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    });
  if (!Number.isInteger(quantity))
    return response
      .status(statusNumberError)
      .json({ err: { code: 'invalid_data', message: '"quantity" must be a number' } });
  next();
}

function validateIdProduct(request, response, next) {
  const { id } = request.params;
  if (!ObjectId.isValid(id))
    return response
      .status(statusNumberError)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  next();
}

function validateIdSales(request, response, next) {
  const { id } = request.params;
  if (!ObjectId.isValid(id))
    return response
      .status(statusError)
      .json({ err: { code: 'not_found', message: 'Sale not found' } });
  next();
}

function verifySales(request, response, next) {
  const sales = request.body;
  for (const verifySalesQuantity of sales) {
    if (!verifySalesQuantity.productId || !verifySalesQuantity.quantity)
      return response
        .status(statusNumberError)
        .json({ err:
            { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });

    if (verifySalesQuantity.quantity <= numberZero)
      return response
        .status(statusNumberError)
        .json({ err:
           { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    console.log(verifySalesQuantity, 'verifysales');
    if (!Number.isInteger(verifySalesQuantity.quantity))
      return response
        .status(statusNumberError)
        .json({ err:
           { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    break;
  }
  next();
}


module.exports = {
  validateIdSales,
  validateIdProduct,
  verifyNameExists,
  verifyProducts,
  verifySales,
};
