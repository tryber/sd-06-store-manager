const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const all = await connection('products').then(db => db.find().toArray());

  return {
    products: all
  };
};

const findById = async (id) => {
  return await connection('products').then(db => db.findOne({ _id: ObjectId(id) }));
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
  findById,
  findByName,
  create,
};
