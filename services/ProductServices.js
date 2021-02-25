const Product = require('../models/Product');
const validation = require('../services/validation');
const {generateError} = require('../utils/errors');
const {unProcessableEntity} = require('../utils/status');

const getAll = async () => {
  return await Product.getAll();
};

const getOne = async (id) => {
  try {
    const product =  await Product.getOne(id);
    return {product};
  } catch (err) {
    return generateError(unProcessableEntity, 'invalid_data', 'Wrong id format');
  }
};

const update = async (id, name, quantity) => {
  const {err} = await validateUpdate(name, quantity);
  if (err) return {err};
  return await Product.update(name, id, quantity);
};

const validate = async (name, quantity) => { 
  const nameExists = await Product.getOneByName(name);  
  if (nameExists) return (
    generateError(unProcessableEntity, 'invalid_data', 'Product Already exists'));
  try {
    await validation.ProductSchema.validate({name, quantity});
    return {};
  } catch (err) {
    return generateError(unProcessableEntity, 'invalid_data', err.message);
  }  

};

const validateUpdate = async (name, quantity) => {
  try {
    await validation.ProductSchema.validate({name, quantity});
    return {};
  } catch (err) {
    return generateError(unProcessableEntity, 'invalid_data', err.message);
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
  getAll, getOne, createOne, update
};