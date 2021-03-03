const Products = require('../../services/products');
const SUCCESS = 200;
const ERROR = 422;

module.exports = async (req, res, _next) => {
  const { id } = req.params;

  const products = await Products.findById(id)
    .then((data) => data)
    .catch((err) => err);

  if (!products) {
    return res
      .status(ERROR)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      });
  }

  return res.status(SUCCESS).json(products);
};