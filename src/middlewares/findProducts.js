const Products = require('../models/products');
const SUCCESS = 200;

module.exports = async (req, res, _next) => {

  const products = await Products.getAll()
    .then((data) => data)
    .catch((err) => err);

  return res.status(SUCCESS).json({ products });
};