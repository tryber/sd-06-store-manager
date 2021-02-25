const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allProd = await connection()
    .then((db) => db.collection('products').find().toArray());
  return { products: allProd};
};

const getById = async (id) =>{
  const prod = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  return prod;
};
const create = async (name, quantity) => 
  await connection()
    .then((db) => 
      db.collection('products').insertOne({ name, quantity}));

const verifyName = async (name) => {
  const verify = await connection()
    .then(db => db.collection('products').findOne({ name: name }));
  if (verify) return true;
  return false;
};

module.exports = {
  getAll,
  getById,
  create,
  verifyName
};