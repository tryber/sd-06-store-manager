const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function getAll() {
  return await connection().then(db => db.collection('sales').find({}).toArray());
}

async function create(sale) {
  return await connection().then(db => db.collection('sales').insertOne(sale));
}

async function find(id) {
  return await connection().then(db => db.collection('sales').findOne(ObjectId(id)));
}

module.exports = {
  getAll,
  create,
  find,
};
