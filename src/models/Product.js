const connection = require('./connection');
const { ObjectId } = require('mongodb');
const collectionName = 'products';

const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection(collectionName).insertOne({
      name, quantity
    }));
  return insertedId ;
};

const getByName = async (name) => {
  const productResponse = await connection()
    .then((db) => db.collection(collectionName).find({
      name
    }).toArray());
  return productResponse;
};

const getAllProduct = async () => {
  const productResponse = await connection()
    .then((db) => db.collection(collectionName).find().toArray());
  return productResponse;
};

const getById = async (id) => {
  return await connection()
    .then((db) => db.collection(collectionName).findOne(ObjectId(id)));
};

const updateById = async (id, name, quantity) => {
  return await connection()
    .then((db) => db.collection(collectionName).updateOne({
      _id: ObjectId(id)
    },
    {
      $set:{name, quantity}
    }
    ));
};

const deleteById = async (id) => {

  const product = await connection()
    .then((db) => db.collection(collectionName).findOne(ObjectId(id)));

  if(!product) return false;

  await connection()
    .then((db) => db.collection(collectionName).deleteOne({
      _id: ObjectId(id)
    }));

  return product;
};

module.exports = {
  createProduct,
  getByName,
  getAllProduct,
  getById,
  updateById,
  deleteById,
};
