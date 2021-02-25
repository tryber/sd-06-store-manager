const { ObjectId } = require('mongodb');
const product = require('../models/product');


// validações
const isValidNewProduct = async (name, quantity)=>{

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

const isValidId = async(id) => {
  try{
    const idExists = await product.getProductById(id); // se der tudo certo vem o produto
    console.log(`idExists: ${idExists}`);
    return idExists; // retorna o id, nome e qtd do produto
  } catch(err){ // se o id não for encontrado
    return 'Wrong id format'; //retorna a msg
  }
};

const createProduct = async (name, quantity) => {
  const invalidProduct = await isValidNewProduct(name, quantity);
  if(invalidProduct !== ''){
    return {invalidProduct};
  }
  return await product.createProduct(name, quantity);
};

const getAll = async ()=>{
  return await product.getAll();
};

const getProductById = async (id) => {
  return await isValidId(id);
};

module.exports = { 
  createProduct,
  getAll,
  getProductById
};


