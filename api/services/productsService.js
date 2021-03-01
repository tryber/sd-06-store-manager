const { ObjectId } = require('mongodb');
const Model = require('../models/registerProducts');

const code = 422;
const ZERO = 0;
const CINCO = 5;
const lessThanEqual = (value, min) => (value <= min);
const lessThan = (value, min) => (value < min);
const notIsNumber = (value) => (typeof value !== 'number');
const isEmptyArray = (value) => (value.length === ZERO);
const isIdValid = (id) => ObjectId.isValid(id);

const getAllProducts = async () => await Model.getAll();


const findProductById = async (id) => {

  if (!isIdValid(id)) return {code, message: 'Wrong id format'};

  const product = await Model.findProductById(ObjectId(id));

  if (!product) return {code, message: 'Wrong id format'};
  
  return product;
};

const registerProduct = async (name, quantity) => { 
  const nameExists =  await Model.findByName(name);
  
  if (!isEmptyArray(nameExists)) return {code, message: 'Product already exists'};
  if(lessThan((name).length, CINCO)) {
    return {code, message:'"name" length must be at least 5 characters long'};
  } 
  if (lessThanEqual(quantity, ZERO)) {
    return {code, message:'"quantity" must be larger than or equal to 1'};
  } 
  if (notIsNumber(quantity)) return {code, message: '"quantity" must be a number'};

  const product = await Model.registerOneProduct(name, quantity);
  return product;
   
};

const registerManyProducts = async (name, quantity) => {
  const products = await Model.registerManyProducts(name, quantity);
  return products;
};

module.exports = {
  getAllProducts,
  registerProduct,
  registerManyProducts,
  findProductById,
}; 
