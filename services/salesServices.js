const {
  create,
  findId,
  findName,
  getAll,
  update,
  remove } = require('../models/salesModel');

const createSale = async (sale) => {
  const newSale = await create(sale);
  return newSale;
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
    const sale = await findId(id);

    return sale;
  } catch(e) {
    throw new Error(e);
  }
};

const findByName = async (name) => {
  const product = await findName(name);

  return product;
};

const getSales = async () => {
  try {
    const sales = await getAll();

    return sales;
  } catch(e) {
    throw new Error(e);
  }
};

module.exports = {
  createSale,
  getSales,
  findById,
  findByName,
  updateProduct,
  deleteProduct
};