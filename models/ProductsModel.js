const { ObjectId } = require('mongodb');
const conn = require('./connection');

const findByName = async (name) => await conn()
  .then(db => db.collection('products').findOne({ name }));

const insertProduct = async (product) => {
  const { insertedId } = await conn()
    .then(db => db.collection('products').insertOne(product));
  return insertedId;
};

const getAll = async () => await conn()
  .then(db => db.collection('products').find({}).toArray());

const findById = async (id) => await conn()
  .then(db => db.collection('products').findOne(ObjectId(id)));
  // .catch(err => new Error(err));

module.exports = {
  findByName,
  insertProduct,
  getAll,
  findById,
};