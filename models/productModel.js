const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const getAll = async () =>
  getCollection('products')
    .then((db) => db.find({}).toArray());

const getById = async (id) =>
  getCollection('products')
    .then((db) => db.findOne({ _id: ObjectId(id) }));

const deleteById = async (id) =>
  getCollection('products')
    .then((db) => db.deleteOne({ _id: ObjectId(id) }));

const getByName = async (name) =>
  getCollection('products')
    .then((db) => db.find({ name }).project({ _id: 0 }).toArray());

const createProduct = async ({ name, quantity }) => {
  const products = getCollection('products')
    .then((db) => db.insertOne({ name, quantity }));
  return products;
};

const editProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const products = getCollection('products')
    .then((db) => db.updateOne(
      { _id: ObjectId(id) }, { $set: { name, quantity } }
    ));
  return products;
};

const updateSale = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const sales = getCollection('sales')
    .then((db) => db.updateOne(
      { _id: ObjectId(id) }, { $set: { itensSold: [{ productId, quantity }] } },
    ));
  return sales;
};

module.exports = { createProduct, getAll, getByName, getById, deleteById, editProduct };

// const getByEmail = async(email, password) => {
//   return getCollection('users')
//     .then((db) => db.findOne(
//       { email: email, password: password },{ projection: { _id: 0 } }
//     ));
// }

// const deleteByQuery = async (query) => {
//   return getCollection('users').then((db) =>
//     db.deleteMany({ email: new RegExp(query, 'i') }));
// }
