const Model = require('../models/registerProducts');



const productsService = async () => await Model.getAll();

const registerProduct = async (name, quantity) =>{ 
  const code = 422;
  const ZERO = 0;
  const CINCO = 5;

  const nameExists =  await Model.findByName(name);
  if (nameExists.length !== ZERO) return {code, message: 'Product already exists'};
  
  if(name.length < CINCO) {
    return {code, message:'"name" length must be at least 5 characters long'};
  } 
    
  if(quantity <= ZERO) {
    return {code, message:'"quantity" must be larger than or equal to 1'};
  }

  if(typeof quantity !== 'number') return {code, message: '"quantity" must be a number'};

  const product = await Model.registerProduct(name, quantity);
  return product;
   
};

module.exports = {
  productsService,
  registerProduct,
}; 
  
