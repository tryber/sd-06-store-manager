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

// Add New Product
const create = async (name, quantity) => {
  const { id } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity}))
    .catch(err => console.error(err));
  return { _id: id, name, quantity };
};

// Update Product
const update = async (id, name, quantity) => {
  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    ).catch(err => console.error(err)));
  return { _id: id, name, quantity };
};

// Remove Product
const remove = async (id) => {
  return await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .catch(err => console.error(err));
};


module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  remove,
};
