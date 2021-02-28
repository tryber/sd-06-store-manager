const Model = require('../models/registerProducts');

const productsService = async () => await Model.getAll();

const registerProduct = async (name, quantity) =>{ 
  const { insertedId } = await Model.registerProduct(name, quantity);
  
  return {
    id: insertedId,
    name,
    quantity,
  };
};

module.exports = {
  productsService,
  registerProduct,
}; 
  
