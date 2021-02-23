const { validateProductName, validateQuantity } = require('../utils/validators');
const { error } = require('../utils/dictionary');

module.exports = (req, _res, next) => {
  const { body: { name, quantity } } = req;
  const isValid = validateProductName(name) && validateQuantity(quantity);
  if (!isValid) throw new Error(error.unexpected);
  next();
};
