const NAME_SIZE = 5;
const QUANTITY_SIZE = 0;

const verifyName = (name) => {
  const verified = typeof(name) === 'string' && name.length >= NAME_SIZE;
  return verified;
};

const verifyQuantity = (quantity) => {
  if (typeof(quantity) === 'string') return null;
  const verified = Number.isInteger(quantity) && quantity > QUANTITY_SIZE;
  return verified;
};

const verifyEqualProduct = (name, product) => {
  const sameName = product.find((exactName) => exactName.name === name);
  return sameName;
};

const verifyProductId = (sale, products) => {
  const result = sale.filter((prId) => products.filter((prod) => prod._id === prId._id));
  return result;
};

module.exports = {
  verifyName,
  verifyQuantity,
  verifyEqualProduct,
  verifyProductId,
};
