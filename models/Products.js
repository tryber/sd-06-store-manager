const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then(db => db.collection('products').find().toArray());
};

async function find(id) {
  return await connection().then(db => db.collection('products').findOne(ObjectId(id)));
}

async function create(product) {
  return await connection().then((db) => db.collection('products').insertOne(product));
}

async function update(id, name, quantity) {
  return await connection().then((db) => {
    return db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } }
    );
  });
}

async function remove(id) {
  return await connection().then((db) => {
    db.collection('products').deleteOne({ _id: ObjectId(id) });
  });
}

module.exports = {
  getAll,
  find,
  create,
  update,
  remove,
};
