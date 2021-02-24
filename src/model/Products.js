const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

// Find All Products
const getAll = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

// Find by Id Products
const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch( (error) => console.error(error)) ;
};

// Find Product by Name
const findByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .catch(err => console.error(err));
};

const create = async (name, quantity) => {
  const { insertedId } = await connection().then((db) => db.collection('products')
    .insertOne({ name, quantity}));

  return {
    id: insertedId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
};
