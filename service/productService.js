const { ObjectId } = require('mongodb');
const product = require('../models/product');

// validações
const existsProductName = async (name) => {
  const nameExits = await product.getProductByName(name);
  const error = {
    isError: true,
  };
  if(nameExits){
    error.message = 'Product already exists';
    error.status = 422;
    return error;
  }
  error.isError = false;
  return error;
};

const isValidProduct = (name, quantity)=>{

  const minLength = 5;
  const minQuantity = 0;
  const error = {
    isError: true,
  };
  if(name.length < minLength){
    error.message = '"name" length must be at least 5 characters long';
    error.status = 422;
    return error;
  } 
  
  if(quantity <= minQuantity){
    error.message = '"quantity" must be larger than or equal to 1';
    error.status = 422;
    return error;
    
  }
  if(!Number.isInteger(quantity)){
    error.message = '"quantity" must be a number'; 
    error.status = 422;
    return error;
  }
  error.isError = false;
  return error;
};


const isValidId = async(id) => {
  const error = {
    isError: true,
  };
  try{
    const idExists = await product.getProductById(id);
    return {...idExists, isError: false};
  } catch(err){
    error.message = 'Wrong id format';
    error.status = 422;
    return error;
  }
};

const createProduct = async (name, quantity) => {
  const invalidProduct = await isValidProduct(name, quantity);
  const invalidProductName = await existsProductName(name);
  if(invalidProductName.isError){
    return invalidProductName;
  } 
  if(invalidProduct.isError){
    return invalidProduct;
  }
  return await product.createProduct(name, quantity);
};

const getAll = async ()=>{
  return await product.getAll();
};

const getProductById = async (id) => {
  return await isValidId(id);
};

const editProductById = async (id, name, quantity) => {
  const invalidProduct = await isValidProduct(name, quantity);
  const invalidId = await isValidId(id);
  console.log(`invalidProduct:  ${invalidProduct}`);
  if(invalidId.isError){
    return invalidId;
  }
  if(invalidProduct.isError){
    return invalidProduct;
  }
  await product.editProductById(id, name, quantity);
  return {
    _id: id,
    name,
    quantity
  };
};

const deleteProduct = async(id) => {
  const invalidId = await isValidId(id);

  if(invalidId.isError){
    return invalidId;
  }
  await product.deleteProduct(id);
  return invalidId;
};

module.exports = { 
  createProduct,
  getAll,
  getProductById,
  editProductById,
  deleteProduct
};


