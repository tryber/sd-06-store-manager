const Sales = require('../../services/sales');
const SUCCESS = 200;
const ERROR = 422;
const ZERO = 0;

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;

  if (quantity <= ZERO || typeof quantity !== 'number') {
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

  await Sales.update(id, productId, quantity)
    .then((data) => data)
    .catch((err) => err);

  return res.status(SUCCESS).json(
    {
      '_id': id,
      'itensSold': [{ 'productId': productId, 'quantity': quantity }]
    });
};