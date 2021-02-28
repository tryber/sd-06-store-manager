// aqui realizar as conexões com o banco, as 'queries' para que os endpoints
// realizem as requisições

// objetoc igual ao objeto do mongo \/:
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  return await connection().then((db) => db.collection('products').insertOne({
    name,
    quantity
  }));
};

const getAllProducts = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  return await connection().then((db) => db.collection('products').updateOne(
    {_id: ObjectId(id)},
    { $set: {name, quantity}}
  ));
};

const deleteProduct = async (id) => {
  return await connection().then((db) => db.collection('products').deleteOne(
    { _id: ObjectId(id)}
  ));
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
