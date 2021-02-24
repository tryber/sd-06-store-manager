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
  const product = await connection()
    .then((db) => db.collection('products').findOne({_id: ObjectId(id) }));
  return product;

};

const update = async (id, name, quantity ) => {
  const product = await connection()
    .then((db) => db.collection('products').updateOne(
      db.collection('products').findOne({_id: ObjectId(id) }),
      {$set:{ name, quantity }},));
  return product;
};

module.exports = {
  create,
  getProductCount,
  getAll,
  getById,
  update,
};