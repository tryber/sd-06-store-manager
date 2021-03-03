const Sales = require('../../services/sales');
const SUCCESS = 200;
const ERROR = 422;

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const product = await Sales.findSaleById(id)
    .then((data) => data)
    .catch((err) => err);

  if (!product) {
    return res
      .status(ERROR)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format'
        }
      });
  }

  await Sales.removeSale(id)
    .then((data) => data)
    .catch((err) => err);

  return res.status(SUCCESS).json(product);
};