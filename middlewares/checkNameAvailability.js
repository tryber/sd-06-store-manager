const { products } = require('../services');
const handleMessage = require('../utils/dictionary/handleMessage');
const { error } = require('../utils/dictionary');

module.exports = async (req, _res, next) => {
  try {
    const { body: { name } } = req;
    const product = await products.findByName(name);
    if (product) next(error.invalidProductName);
    next();
  } catch (err) {
    err.message = handleMessage(err.message);
    next(err);
  }
};
