const Sales = require('../models/SalesModel');
const { validateSale, validationIdSale } = require('./Validations');

// Desafio 5 - Cadastra uma venda
const createSale = async (itensSold) => {
  const validation = await validateSale(itensSold);
  if(!validation) return {message: 'Wrong product ID or invalid quantity'};
  return await Sales.createSale(itensSold);
};

// Desafio 6 - Listar todas as vendas
const getAllSales = async () => {
  return await Sales.getAllSales();
};

// Desafio 6 - Busca uma venda pelo id
const findByIdSale = async (id) => {
  const validation = validationIdSale(id);
  if(!validation) return {message: 'Sale not found'};
  return await Sales.findByIdSale(id);
};

// const updateByIdProduct = async (id, name, quantity) => {
//   const validation = await validationUpdate(name, quantity);
//   if(validation) return validation;
//   return await Product.updateByIdProduct(id, name, quantity);
// };

// const deleteByIdProduct = async (id) => {
//   const product = findByIdProduct(id);
//   await Product.deleteByIdProduct(id);
//   return product;
// };

module.exports = {
  createSale,
  getAllSales,
  findByIdSale,
  // updateByIdProduct,
  // deleteByIdProduct,
};

