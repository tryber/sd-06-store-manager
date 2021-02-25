const ProductSchema = require('../schemas/ProductSchema');

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  const { status_code, code, message } = ProductSchema.validate(name, quantity);

  const error_message = {err: {code, message}};
  if (message) return res.status(status_code).json(error_message);

  next();
};

module.exports = {
  validateProduct,
};
