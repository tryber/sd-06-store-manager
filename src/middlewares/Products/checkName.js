const Products = require('../../services/products');
const ERRORCODE = 422;

module.exports = async (req, res, next) => {
  const { name, quantity } = req.body;
  const products = await Products.getAll()
    .then((products) => products)
    .catch((err) => console.error(err));

  if (products.find(product => product.name === name)) {
    return res
      .status(ERRORCODE)
      .json({ err: { code: 'invalid_data', message: 'Product already exists' } });
  }

  next();
};