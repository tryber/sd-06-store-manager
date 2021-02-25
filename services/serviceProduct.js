const model = require('../models/modelProduct');

const getAllProducts = async () => {
  return model.getAllProducts();
};

const getByIdProduct = async (id) => {
  const product = await model.getByIdProduct(id);
  console.log(product);
  // if(!product){
  //   return {
  //     error:{
  //       code: 'invalid_data',
  //       message: '',
  //     }
  //   };
  // }

  return product;
};

const createProduct = async ({ name, quantity }) => {
  const productExists = await model.getByNameAndQuantity(name, quantity);

  // if (productExists){
  //   return {
  //     error: true,
  //     code: 'already_exists',
  //     message: ''
  //   };
  // }

  const newProduct = await model.createProduct({ name, quantity });

  return newProduct;
};

const getByName = async ({ name }) => {
  const productExists = await model.getByName({name});

  return productExists;
};

const updateProduct = async({ id, name, quantity }) => {
  const update = await model.updateProduct({id, name, quantity});

  return update;
};

const excludeProduct = async (id) => {
  const exclude = await model.excludeProduct(id);

  return exclude;
};

module.exports = {
  excludeProduct,
  updateProduct,
  createProduct,
  getByIdProduct,
  getByName,
  getAllProducts,
};