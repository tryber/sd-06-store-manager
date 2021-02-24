const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then(db => db.collection('tasks').find().toArray());
};

const findByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne({name}));
};

const create = async (name,quantity) => {
  const { insertedId } = await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }));
  return {
    id: insertedId,
    name,
    quantity
  };
};

module.exports = {create, findByName};
