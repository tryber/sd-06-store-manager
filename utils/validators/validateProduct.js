const { error } = require('../dictionary');
const { validateProductName, validateQuantity } = require('./products');

module.exports = async (product) => {
  const { name, quantity } = product;
  const isValid = validateProductName(name) && validateQuantity(quantity);
  if (!isValid) throw new Error(error.unexpected);
};
