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
  return await sales.getAll();
};

const createSale = async(sale)=>{
  const error ={
    isError: true,
  };
  const allValidatedSales = await 
  Promise.all(sale.map(e => isValidQuantity(e.quantity))); // validação
  console.log('allValidatedSales', allValidatedSales);
  const isAllSalesValid = allValidatedSales.find(e => {if(e) return true;});
  console.log('isAllSalesValid', isAllSalesValid);
  if(!isAllSalesValid){
    error.message = 'Wrong product ID or invalid quantity';
    error.status = 422;
    console.log('error', error);
    return error;
  }  
  return await sales.createSale(sale);

};

module.exports = {
  getAll,
  createSale
}