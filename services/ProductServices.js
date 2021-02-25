const Product = require('../models/Product');
const validation = require('../services/validation');

const getAll = async () => {
  return await Product.getAll();
};

const getOne = async (id) => {
  return await Product.getOne(id);
};

const validate = async (name, quantity) => {
 
  const nameExists = await Product.getOneByName(name);  
  if (nameExists) return {
    err: {
      code: 'invalid_data', message:'Product already exists', status: 422
    }
  };

  try {
    await validation.ProductSchema.validate({name, quantity});
    return {};
  } catch (err) {
    return {err: {
      code: 'invalid_data',
      message: err.message,
      status: 422
    }};
  }  

};

const createOne = async (product) => {
  const {name, quantity} = product;
  const {err} = await validate(name, quantity);
  console.log(err);
  if(err) return {err};
  return await Product.createOne({name, quantity});
};

module.exports = {
  getAll, getOne, createOne
};