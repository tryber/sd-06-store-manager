const connection = require('./connection');

const getAll = async () => {
  return await connection().then(db => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return await connection().then(db => db.collection('products').insertOne({
    name,
    quantity
  }));
};

const findByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne({name}));
};

module.exports ={
  getAll,
  createProduct,
  findByName
};
