const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => 
  await connection()
    .then(db => db.collection('products').find().toArray());

const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }));

  return {
    _id: insertedId,
  };
};

const getByName = async (name) => {
  return await connection()
    .then(db => db.collection('products').findOne({ name }));
};

const getById = async (id) => {
  return await connection()
    .then(db => db.collection('products').findOne(ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  return await connection()
    .then(db => db.collection('products')
      .updateOne( {_id: ObjectId(id) }, { $set: { name: name, quantity: quantity } }));
};


module.exports = {
  createProduct,
  getAllProducts,
  getByName,
  getById,
  updateProduct,
};
