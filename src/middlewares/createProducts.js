const Products = require('../models/products');
const SUCCESS = 201;

module.exports = async (req, res, next) => {
  const { name, quantity } = req.body;

  const [products] = await Products.create(name, quantity)
    .then((data) => data.ops)
    .catch((err) => err);

  return res.status(SUCCESS).json(products);
};