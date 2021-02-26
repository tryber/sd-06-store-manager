const { Products } = require('../models/index');
const { verifyName, verifyQuantity, verifyEqualProduct } = require('../assets');
const ID_LENGTH = 24;

const getProd = async () => {
  const allProducts = await Products.getProducts();
  return allProducts;
};

const getProdById = async (id) => {
  const err =  { err: { code: 'invalid_data', message: 'Wrong id format' }};
  if (id.length !== ID_LENGTH) {
    return err;
  } 
  const oneProduct = await Products.getProductsById(id);
  return oneProduct ? oneProduct : err;
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

module.exports = { addProd, getProd, verifyAll, getProdById };
