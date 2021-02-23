const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const products = await connection()
    .then(db => db.collection('products').find().toArray());
  
  return { products: products };
};

const getById = async (id) => {
  return await connection().then(db => db.collection('products').findOne(ObjectId(id)));
};

const create = async (name, quantity) => {
  const { insertedId } = await connection().then(db => db.collection('products')
    .insertOne({ name: name, quantity: quantity }));

  return {
    _id: insertedId,
    name: name,
    quantity: quantity
  };
};

const checkName = async (name) => {
  const check =  await connection().then(db => db.collection('products')
    .findOne({ name: name }));
  // console.log(check);
  if (check) return true;
  return false;
};

module.exports = {
  getAll,
  getById,
  create,
  checkName,
};
