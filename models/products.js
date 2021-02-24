const { ObjectID } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { id: insertedId, name, quantity };
};

const getProducts = async () => {
  return await connection().then((db)=> db.collection('products').find().toArray());
};

const getProductsById = async (id) => {
  return await connection().then((db) => db.collection('products').findOne(ObjectID(id)));
};

module.exports = { addProduct, getProducts, getProductsById };
