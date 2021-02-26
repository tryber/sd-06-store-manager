const ProductsModel = require('../models/ProductsModel');
const getAllProductsService = async () => {
  const allProducts = await ProductsModel.getAllProducts();
  return allProducts;
};
const createProductService = async (name, quantity) => {
  const { _id } = await ProductsModel.createProduct(name, quantity);
  return ({
    _id,
    name,
    quantity,
  });
};
const getByIdService = async (id) => {
  const product = await ProductsModel.getById(id);
  return product;
};
const editProductService = async (id, name, quantity) => {
  await ProductsModel.editById(id, name, quantity);
  return { id, name, quantity };
};
const deleteProductService = async (id) => {
  return await ProductsModel.deleteProduct(id);
};
module.exports = {
  createProductService,
  getAllProductsService,
  getByIdService,
  editProductService,
  deleteProductService,
};
