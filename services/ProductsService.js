const { Products } = require('../models/index');
const { verifyName, verifyQuantity, verifyEqualProduct } = require('../assets');

const ID_LENGTH = 24;
const STATUS_422 = 422;
const err =  { err: { code: 'invalid_data', message: 'Wrong id format' }};

const getProd = async () => {
  const allProducts = await Products.getProducts();
  return allProducts;
};

const getProdById = async (id) => {
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

const middlewareVerification = async (response, name, quantity) => {
  const verifyField = await verifyAll(name, quantity);
  if (!verifyField.verifiedName)return response.status(STATUS_422).json({ err:
    { code: 'invalid_data', message: '"name" length must be at least 5 characters long' }
  });
  if(verifyField.verifiedQuantity === null) return response.status(STATUS_422).json(
    {
      err:
        { code: 'invalid_data', message: '"quantity" must be a number' }
    }
  );
  if (!verifyField.verifiedQuantity) return response.status(STATUS_422).json({ err:
    { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1'}
  });
  if (verifyField.verifiedSameName) return response.status(STATUS_422).json({ err:
    { code: 'invalid_data', message: 'Product already exists'}
  });
  return null;
};

const addProd = async (name, quantity) => {
  const product = await Products.addProduct(name, quantity);
  return product;
};

const updateProd = async (id, name, quantity) => {
  const productUpdated = await Products.updateById(id, name, quantity);
  return productUpdated;
};

const deleteProd = async (id) => {
  if (id.length !== ID_LENGTH) return err;
  return await Products.deleteProductsById(id); 
};

module.exports = { 
  addProd,
  getProd,
  verifyAll,
  getProdById,
  updateProd,
  middlewareVerification,
  deleteProd,
};
