const { ObjectId } = require('mongodb');
const sales = require('../models/sale');

const isValidQuantity = (quantity) =>{
  const minQuantity = 0;
  if(typeof(quantity) === 'string'|| quantity <= minQuantity  ){
    return false;
  }
  return true;
};

const getAll = async()=>{
  const sale = await sales.getAll();
  return sale;
};

const getSaleById = async(id)=>{
  const error = {
    isError: false
  };

  try{
    const validSaleId = await sales.getSaleById(id);
    console.log('validSaleID', validSaleId);
    return validSaleId;
  }catch{
    error.isError = true;
    error.status = 404,
    error.message = 'Sale not found';
    return error;
  
  }
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

const editSaleById = async(id, sale)=>{
  const error = {
    isError: false,
  };
  const validQuantity = isValidQuantity(sale[0].quantity);
  console.log('validQuantity', validQuantity);
  if(!validQuantity){
    error.message = 'Wrong product ID or invalid quantity';
    error.status = 422;
    error.isError = true;
    return error;
  }
  await sales.editSaleById(id, sale);
  return {
    _id: id,
    itensSold: [
      {
        productId: sale[0].productId,
        quantity: sale[0].quantity,
      }
    ]
  };
};

const deleteSaleById = async(id)=>{
  const error = {
    isError: false
  };
  try{
    const validSaleId = await sales.getSaleById(id);
    await sales.deleteSaleById(id);
    console.log('validSaleID', validSaleId);
    return validSaleId;
  } catch {
    error.isError = true;
    error.status = 422,
    error.message = 'Wrong sale ID format';
    return error;
  }
};

module.exports = {
  getAll,
  createSale,
  getSaleById,
  editSaleById,
  deleteSaleById
};
