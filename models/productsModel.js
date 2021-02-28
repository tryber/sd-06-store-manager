const connection = require('./connection');

const getAllProducts = async () => { 
  return connection('products').then((product) => product.find().toArray());
};

const searchForProductName = async (name) => { 
  return connection('products').then((product) => product.find({
    'name': name
  }).toArray());
};

const addNewProduct = async (name, quantity) => {
  return connection('products').then((product) => product.insertOne({
    'name': name,
    'quantity': quantity
  }));
};

module.exports = {
  getAllProducts,
  addNewProduct,
  searchForProductName,
};
