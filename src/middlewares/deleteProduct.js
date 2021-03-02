const Products = require('../services/products');
const SUCCESS = 200;
const ERROR = 422;

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const product = await Products.findById(id)
    .then((data) => data)
    .catch((err) => err);

  if (!product) {
    return res
      .status(ERROR)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      });
  }

  await Products.deleteProduct(id)
    .then((data) => data)
    .catch((err) => err);

  return res.status(SUCCESS).json(product);
};