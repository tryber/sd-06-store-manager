// aqui realizar as conexões com o banco, as 'queries' para que os endpoints
// realizem as requisições

// objetoc igual ao objeto do mongo \/:
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return await connection().then((db) => db.collection('products').insertOne({
    name,
    quantity
  }));
};

const updateProduct = async (id, name, quantity) => {
  return await connection().then((db) => db.collection('products').updateOne(
    {_id: ObjectId(id)},
    { $set: {name, quantity}}
  ));
};


module.exports = {
  getAll,
  createProduct,
  updateProduct,
};
