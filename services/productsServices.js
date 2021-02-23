const {
  create,
  findName,
  findId,
  getProducts,
  update } = require('../models/productsModel');

const createProduct = async (product) => {
  const createdProduct = await create(product);

  return createdProduct;
};

const updateProduct = async (product) => {
  const updateProduct = await update(product);

  return updateProduct;
};

const findByName = async (name) => {
  const product = await findName(name);

  return product;
};

const findById = async (id) => {
  try {
    const product = await findId(id);

    return product;
  } catch(e) {
    throw new Error(e);
  }
};

const getAll = async () => {
  try {
    const products = await getProducts();

    return products;
  } catch(e) {
    throw new Error(e);
  }
};

module.exports = {
  createProduct,
  findByName,
  findById,
  getAll,
  updateProduct
};