const { createSales, getAllSales, getById, deleteSale } = require('../models/SalesModel');

// const updateProductService = async (id, name, quantity) => {
//   await ProductsModel.updateProduct(id, name, quantity);

//   return ({
//     id,
//     name,
//     quantity,
//   });
// };

// const deleteProductService = async (id) => {
//   return await ProductsModel.deleteProduct(id);
// };

const createSalesService = async (itensSold) => {
  const { _id } =  await createSales(itensSold);
  return _id;
};

const getAllSalesService = async () => {
  return await getAllSales();
};

const getByIdService = async (id) => {
  return await getById(id);
};

const deleteSaleService = async(id) => {
  return await deleteSale(id);
};

module.exports = {
  createSalesService,
  getAllSalesService,
  getByIdService,
  deleteSaleService
};
