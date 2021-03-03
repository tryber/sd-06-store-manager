const Sales = require('../../services/sales');
const Products = require('../../services/products');
const SUCCESS = 200;
const ERROR = 422;
const ZERO = 0;

module.exports = async (req, res) => {
  const data = req.body;

  const products = await Products.getAll()
    .then((data) => data)
    .catch((err) => err);

  const productIdIsValid = products
    .some((product) => data.some(({ productId }) => (productId == product['_id'])));
  if (!productIdIsValid || !data.every(({ quantity }) => quantity > ZERO)) {
    return res
      .status(ERROR)
      .json(
        {
          'err':
          {
            'code': 'invalid_data',
            'message': 'Wrong product ID or invalid quantity'
          },
        });
  }

  const [sale] = await Sales.createSale(data)
    .then((data) => data.ops)
    .catch((err) => err)
    ;

  return res.status(SUCCESS).json(sale);
};