const connection = require('./connection');

const getAll = async() => {
  return await connection().then(db => db.collection('products').find().toArray());
};

const createProduct = async(name, quantity) => {
  return await connection().then(db => {
    console.log('estou aqui');
    return db.collection('products').insertOne({name, quantity});
  }
  );
};

module.exports = {
  getAll,
  createProduct
};
