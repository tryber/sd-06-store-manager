const connection = require('../models/connection');
const { ObjectId } = require('mongodb');


const createProduct = async ( name, quantity) => {
  return await connection().then((db) => db.collection('products').insertOne(
    { name, quantity }
  ));
};

const findProductByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').find({ name }).toArray());
};

const findProductById = async (idproduto) => {
  return await connection()
    .then((db) => db.collection('products')
      .find({ _id: new ObjectId(idproduto) }).toArray());
};

const getAll = async () => {
  return await connection()
    .then(db => db.collection('products').find().toArray());
};

const updateNameQuantity = async (id, newName, newquantity) => {
  await connection()
    .then(db => db.collection('products')
      .updateOne({ _id: new ObjectId(id) },
        { $set: { name: newName, quantity: newquantity }}));
};

const deleteProduct = async (id) => {
  return await connection()
    .then(db => db.collection('products').deleteOne({ _id: new ObjectId(id) }));
};

module.exports = {
  createProduct,
  findProductByName,
  findProductById,
  getAll,
  updateNameQuantity,
  deleteProduct
};
