const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addProduct = async (name, quantity) => 
  await connection()
    .then((db) => 
      db.collection('products').insertOne({ name, quantity }));

const getProducts = async () => 
  await connection()
    .then((db) => 
      db.collection('products').find().toArray());

const getById = async (id) => 
  await connection()
    .then((db) => 
      db.collection('products').findOne(ObjectId(id)));

const productUpdated = async (id, name, quantity) => 
  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } }
    ));

const updateStock = async (id, value) => 
  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $inc: { quantity: -value } }
    ));

const productDeleted = async (id) => 
  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  addProduct,
  getProducts,
  getById,
  productUpdated,
  productDeleted,
  updateStock,
};
