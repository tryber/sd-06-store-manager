const connection = require('./connection');

const getAllProducts = async () => { 
  return await connection().then((db) => db.collection(('products')).find({}).toArray());
};

const searchForProductName = async (name) => { 
  return await connection().then((db) => db.collection(('products')).find({
    'name': name
  }).toArray());
};

const addNewProduct = async (name, quantity) => {
  return await connection().then((db) => db.collection('products').insertOne({
    name,
    quantity
  }));
};

module.exports = {
  getAllProducts,
  addNewProduct,
  searchForProductName,
};
