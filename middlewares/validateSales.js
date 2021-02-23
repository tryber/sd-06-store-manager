const { findByName } = require('../services/productsServices');

const UNPROCESSABLE = 422;
const zero = 0;

module.exports = async (req, res, next) => {
  const array = [...req.body];
  array.forEach((sale) => {
    if (!sale.quantity || sale.quantity <= zero || typeof sale.quantity !== 'number')
      return res.status(UNPROCESSABLE).send({
        err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  });

  next();
};