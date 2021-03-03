const Sales = require('../../services/sales');
const SUCCESS = 200;
const ERROR = 404;

module.exports = async (req, res, _next) => {
  const { id } = req.params;

  const products = await Sales.findSaleById(id)
    .then((data) => data)
    .catch((err) => err);

  if (!products) {
    return res
      .status(ERROR)
      .json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      });
  }

  return res.status(SUCCESS).json(products);
};