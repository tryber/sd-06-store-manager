const {
  create,
  findId,
  findName,
  getAll,
  update,
  remove } = require('../models/productsModel');

const createProduct = async (product) => {
  await create(product);
  return product;
};

const deleteProduct = async (id) => {
  try {
    return await remove(id);
  } catch(e) {
    console.log(e);
  }
};

const updateProduct = async (product) => {
  try {
    await update(product);
    return product;
  } catch(e) {
    console.log(e);
  }
};

const findById = async (id) => {
  try {
    const product = await findId(id);

    return product;
  } catch(e) {
    throw new Error(e);
  }
};

const findByName = async (name) => {
  const product = await findName(name);

  return product;
};

const getProducts = async () => {
  try {
    const products = await getAll();

    return products;
  } catch(e) {
    throw new Error(e);
  }
};

module.exports = {
  createProduct,
  findById,
  findByName,
  getProducts,
  updateProduct,
  deleteProduct
};