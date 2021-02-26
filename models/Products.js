const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then(db => db.collection('products').find().toArray());
};

const findById = async (id) => {
  return await connection().then(db => db.collection('products').findOne(ObjectId(id)));
};

const findByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne({ name }));
};

const create = async (name, quantity) => {
  const { insertedId } = await connection()
    .then(db => db.collection('products').insertOne({
      name, quantity,
    }));

  return {
    insertedId,
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
