const ZERO = 0;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;
const validateSale = async (req, res, next) => {
  const products = req.body;
  const quantity = products.map((product) => product.quantity);
  const isNotValid = quantity.some((item) => item <= ZERO || typeof item !== 'number');
  if (isNotValid) {
    return res.status(UNPROCESSABLE)
      .json({ err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
      });
  };
  next();
};
const validateSalesId = async (req, res, next) => {
  const LIMITID = 24;
  const { id } = req.params;
  if(id.length < LIMITID) return res.status(NOT_FOUND).json({ err: {
    code: 'not_found',
    message: 'Sale not found'
  }});
  next();
};
module.exports = {
  validateSale,
  validateSalesId,
};
