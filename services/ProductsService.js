const { Products } = require('../models/index');
const { verifyName, verifyQuantity, verifyEqualProduct } = require('../assets');

const getProd = async () => {
  const allProducts = await Products.getProducts();
  return allProducts;
};

const verifyAll = async (name, quantity) => {
  const verifiedName = verifyName(name);
  const verifiedQuantity = verifyQuantity(quantity);
  const verifiedSameName = await verifyEqualProduct(name, await getProd());
  return { verifiedName, verifiedQuantity, verifiedSameName };
};

const addProd = async (name, quantity) => {
  const product = await Products.addProduct(name, quantity);
  return product;
};

module.exports = { addProd, getProd, verifyAll };
