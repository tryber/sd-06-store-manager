const { nameFind } = require('../services/products');

const UNPROCESSABLE = 422;

module.exports = async (req, res, next) => {
  const { name } = req.body;

  const nameFound = await nameFind(name);
  if (nameFound !== null) return res.status(UNPROCESSABLE).send({
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  });
  next();
}; 