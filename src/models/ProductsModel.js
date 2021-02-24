const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  
  return {
    id: insertedId,
    name,
    quantity,
  };
};

const getAllProducts = async() => {
  return { products: await connection()
    .then((db) => db.collection('products').find().toArray())};
};

const findByIdProduct = async(id) => {
  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateByIdProduct = async(id, name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products')
      .updateOne({_id: ObjectId},{ $set:{name, quantity}}));
  return {
    id: insertedId,
    name,
    quantity,
  };
};

const deleteByIdProduct = async(id) => {
  return await connection().then((db) => db.collection('products')
    .deleteOne({_id: ObjectId}));
};

const findByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .catch(err => console.error(err));
};

module.exports = {
  createProduct,
  getAllProducts,
  findByIdProduct,
  updateByIdProduct,
  deleteByIdProduct,
  findByName,
};
