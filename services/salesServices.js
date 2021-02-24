const {
  create,
  findId,
  findName,
  getAll,
  update,
  remove } = require('../models/salesModel');
const {updateProduct, findProductById } = require('./productsServices');

const createSale = async (sale) => {
  const newSale = await create(sale);
  return newSale;
};

const deleteSale = async (id) => {
  try {
    const saleArray = await findId(id);
    saleArray.itensSold.forEach(async (sale) => {
      const { productId, quantity } = sale;
      const product = await findProductById(productId);

      const editProduct = {
        id: productId,
        name: product.name,
        quantity: product.quantity + quantity };

      await updateProduct(editProduct);
    });
    return await remove(id);
  } catch(e) {
    console.log(e);
  }
};

const updateSale = async (sale) => {
  try {
    return await update(sale);
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
  updateSale,
  deleteSale
};