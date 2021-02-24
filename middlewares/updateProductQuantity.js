const {
  updateProduct,
  findProductById } = require('../services/productsServices');

const NOT_FOUND = 404;
const zero = 0;

module.exports = async (req, res, next) => {
  const array = [...req.body];

  array.forEach(async (sale) => {
    const { productId, quantity } = sale;
    const product = await findProductById(productId);

    const editProduct = {
      id: productId,
      name: product.name,
      quantity: product.quantity - quantity };

    if (editProduct.quantity < zero) return res.status(NOT_FOUND).send({
      err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } });

    await updateProduct(editProduct);
  });

  next();
};