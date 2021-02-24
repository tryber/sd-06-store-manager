const { getProducts, updateProduct, findById } = require('../services/productsServices');

const UNPROCESSABLE = 422;
const zero = 0;

module.exports = async (req, _res, next) => {
  const { id } = req.params;
  const array = [...req.body];
  const products = await getProducts();

  array.forEach(async (sale) => {
    const { productId, quantity } = sale;
    const product = await findById(productId);

    const editProduct = {
      id: productId,
      name: product.name,
      quantity: product.quantity - quantity };

    await updateProduct(editProduct);
  });

  next();
};