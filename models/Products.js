// aqui realizar as conexões com o banco, as 'queries' para que os endpoints
// realizem as requisições

const connection = require('./connection');

const getAll = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return await connection().then((db) => db.collection('products').insertOne({
    name,
    quantity
  }));
} ;

module.exports = {
  getAll,
  createProduct,
};
