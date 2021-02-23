const { createProduct } = require('../models/products');

const Created = 201;

const createProduts = async (req, res) => {
  const DbNewProduct = await createProduct(req.body);

  return res.status(Created).json(DbNewProduct.ops[0]);
};

module.exports = {
  createProduts
};
