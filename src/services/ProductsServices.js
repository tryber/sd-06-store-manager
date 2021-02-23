const models = require('../models/ProductsModel');
const { throwError } = require('../errorHandler/errorHandler');
const {status, errorMessages} = require('../errorHandler/utils/status');

const registerProduct = async ({name, quantity}) => {

  const product = await models.findByName(name);

  if (product) {
    throw new throwError(status.unprocessableEntity, errorMessages.productExists);
  }

  const insertedObject = await models.registerProduct(name, quantity);

  const responsePayload = {
    _id: insertedObject.insertedId,
    name,
    quantity,
  };

  return responsePayload;
};

module.exports = {
  registerProduct,
};
