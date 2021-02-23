const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertProduct = async (name, quantity) => await connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

const getAllProducts = async () => await connection()
  .then((db) => db.collection('products').find().toArray());

const findById = async (id) => await connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const updateProduct = async (id, name, quantity) => await connection()
  .then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }
  ));

module.exports = {
  insertProduct,
  getAllProducts,
  findById,
  updateProduct,
};
