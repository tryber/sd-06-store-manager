const { products } = require('../services');
const { status } = require('../utils/dictionary');
const handleMessage = require('../utils/dictionary/handleMessage');

module.exports = async (req, res, next) => {
  try {
    const { body } = req;  
    const newProduct = await products.createProduct(body);
    return res.status(status.created).json(newProduct);
  } catch (err) {
    err.message = handleMessage(err.message);
    next(err);
  }
};
