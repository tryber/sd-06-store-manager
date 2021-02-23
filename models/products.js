const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection('products').then(db => db.find().toArray());
};

const findByName = async (name) => {
  return await connection('products').then(db => db.findOne({ name }));
};

const create = async (name, quantity) => {
  const product = await connection('products')
    .then(db => db.insertOne({ name, quantity }));

  return {
    _id: product.insertedId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  findByName,
  create,
};
