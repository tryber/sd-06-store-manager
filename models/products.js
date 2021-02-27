const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { _id: insertedId, name, quantity };
};

const updateById = async (id, name, quantity) => {
  await connection().then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } }
  ));
  return { _id: id, name, quantity };
};

const getProducts = async () => {
  return await connection().then((db)=> db.collection('products').find().toArray());
};

const getProductsById = async (id) => {
  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const deleteProductsById = async (id) => {
  return await connection().then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  addProduct,
  getProducts,
  getProductsById,
  updateById,
  deleteProductsById,
};
