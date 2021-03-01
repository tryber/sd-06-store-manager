const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => {
      return products;
    });
};

const findByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').find({name: name}).toArray())
    .then((res) => res);
};

const findProductById = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .then((res) => res)
    .catch((err) => console.error(err));
};

const registerOneProduct= async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}))
    .then((result) => result);

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const registerManyProducts = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertMany({name, quantity}))
    .then((result) => result);

  return {
    id: insertedId,
    name,
    quantity,
  };
};

const updateProduct = async (id, name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').updateOne(
      {_id: ObjectId(id) },
      { $set: {name, quantity} }, 
    ))
    .then((res) => res.modifiedCount)
    .catch((err) => console.error(err));
};

const deleteProduct = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOneAndDelete(
      {_id: ObjectId(id)}
    ))
    .then((res) => res)
    .catch((err) => console.error(err));
};

module.exports = {
  getAll,
  registerOneProduct,
  findByName,
  registerManyProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};


