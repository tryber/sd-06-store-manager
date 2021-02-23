const connection = require('./connection');

const getAll = async () => {
  return await connection().then(db => db.collection('products').find().toArray());
};

const create = async (name, quantity) => {
  return await connection().then(db => 
    db.collection('products').insertOne({ name, quantity }));
};

const getByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne({ name }));
};

module.exports = {
  getAll,
  create,
  getByName
};