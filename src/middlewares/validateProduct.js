const Products = require('../services/products');
const ERRORCODE = 422;
const ZERO = 0;
const TAMANHO_NOME = 5;

module.exports = async (req, res, next) => {
  const { name, quantity } = req.body;
  const products = await Products.getAll()
    .then((products) => products)
    .catch((err) => console.error(err));
  if (name.length < TAMANHO_NOME) {
    return res
      .status(ERRORCODE)
      .json(
        {
          err:
          {
            code: 'invalid_data',
            message: '"name" length must be at least 5 characters long'
          }
        });
  }

  if (quantity <= ZERO) {
    return res
      .status(ERRORCODE)
      .json({
        err:
        {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1'
        }
      });
  }
  if (typeof quantity !== 'number') {
    return res
      .status(ERRORCODE)
      .json({ err: { code: 'invalid_data', message: '"quantity" must be a number' } });
  }

  next();
};