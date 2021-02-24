const ZERO = 0;
const STATUS422 = 422;

const validateSale = (req, res, next) => {
  const arraySales = req.body;

  for (let i = ZERO; i < arraySales.length; i+= 1) {
    if ( !Number(arraySales[i].quantity) ) return res.status(STATUS422).json({ 'err': {
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'
    } });

    if ( arraySales[i].quantity <= ZERO ) return res.status(STATUS422).json({ 'err': {
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'
    } });
  }

  return next();
};

module.exports = {
  validateSale
};