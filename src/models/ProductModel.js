const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getProductCount = async (name) => {
  const result = await connection()
    .then((db) => db.collection('products').count({name}));
  return result;
};

const create = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return ({_id: insertedId, name, quantity});
};

const getAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return ({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }});
  }
  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  console.log(product);
  return product;
  
};

module.exports = {
  create,
  getProductCount,
  getAll,
  getById,
};