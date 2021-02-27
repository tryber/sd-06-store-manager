const { ObjectId } = require('mongodb');
const sales = require('../models/sale');

const isValidQuantity = (quantity) =>{
  const minQuantity = 0;
  if(typeof(quantity) === 'string'|| quantity <= minQuantity  ){
    return false;
  }
  return true;
};

const isValidSaleId = async(id)=>{
  const error = {
    isError: false
  };
  const saleId = await sales.getSaleById(id);
  if(!saleId){
    error.isError = true;
    error.status = 404,
    error.message = 'Sale not found';
    return error;
  }
  return error;
};

const getAll = async()=>{
  return await sales.getAll();
};

const getSaleById = async(id)=>{
  const validSaleId = await isValidQuantity(id);
  if(!validSaleId){
    return validSaleId;
  }
  return await sales.getSaleById(id);
};

const createSale = async(sale)=>{
  const error = {
    isError: true,
  };
  const allValidatedSales = await 
  Promise.all(sale.map(e => isValidQuantity(e.quantity))); // validação
  const isAllSalesValid = allValidatedSales.find(e => {if(e) return true;});
  if(!isAllSalesValid){
    error.message = 'Wrong product ID or invalid quantity';
    error.status = 422;
    return error;
  }  
  return await sales.createSale(sale);
};

module.exports = {
  getAll,
  createSale,
  getSaleById
};
