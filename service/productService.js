const { ObjectId } = require('mongodb');
const product = require('../models/product');


// validações
const isValidProduct = async (name, quantity)=>{

  const minLength = 5;
  const minQuantity = 0;
  const nameExits = await product.getProductByName(name);

  if(name.length < minLength){
    return '"name" length must be at least 5 characters long';
  } 
  if(nameExits){
    return 'Product already exists';
  }
  if(quantity <= minQuantity){
    return '"quantity" must be larger than or equal to 1';
    
  }
  if(!Number.isInteger(quantity)){
    return '"quantity" must be a number'; 
  }
  return '';
};

const createProduct = async (name, quantity) => {
  const inValidProduct = await isValidProduct(name, quantity);
  if(inValidProduct !== ''){
    return {inValidProduct};
  }
  return await product.createProduct(name, quantity);
};

module.exports = { createProduct };