const Sales = require('../models/SalesModel');
const { validateSale, validationIdSale, validationUpdateSale } = require('./Validations');

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

// Desafio 7 - Atualizar uma venda pelo id
const updateByIdSale = async (id, itensSold) => {
  const verifyItensSold = validateSale(itensSold);
  const verifyId = validationIdSale(id);
  if(!verifyItensSold || !verifyId) {
    return {message: 'Wrong product ID or invalid quantity'};
  }
  return await Sales.updateByIdSale(id, itensSold);
};

// Desafio 8 - Deletar uma venda pelo id
const deleteByIdSale = async (id) => {
  const sale = await findByIdSale(id);
  if(sale.message === 'Sale not found') {
    return {message: 'Wrong sale ID format'};  
  } else {
    await Sales.deleteByIdSale(id);
    return sale;
  }
};

module.exports = {
  createSale,
  getAllSales,
  findByIdSale,
  updateByIdSale,
  deleteByIdSale,
};

