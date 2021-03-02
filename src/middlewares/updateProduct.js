const Products = require('../services/products');
const SUCCESS = 200;

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const products = await Products.update(id, name, quantity)
    .then((data) => data)
    .catch((err) => err);

  return res.status(SUCCESS).json({ id, name, quantity });
};