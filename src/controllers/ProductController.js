const createProductServices = require('../services/CreateProductService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const resp = await createProductServices(name, quantity);

  return res.status(resp[0]).json(resp[1]);
};

module.exports = {
  createProduct,
};
