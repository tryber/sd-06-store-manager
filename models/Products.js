const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const getProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateProduct = async (name, quantity, id) => {
  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } }
    ));

  return {
    _id: id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  if (product) {
    const { name, quantity } = product;

    await connection()
      .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
    
    return {
      _id: id,
      name,
      quantity,
    };
  }
  throw 'product not found';
};

module.exports = {
  registerProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
