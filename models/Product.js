const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function getAll() {
  const db = await connection();
  const queryResult = await db
    .collection('products')
    .find()
    .toArray();

  return queryResult;
}

async function findById(id) {
  const db = await connection();
  const queryResult = await db
    .collection('products')
    .findOne(ObjectId(id));
  return queryResult;
}

async function findByName(name) {
  const db = await connection();
  const queryResult = await db
    .collection('products')
    .findOne(
      { name },
    );

  return queryResult;
}

async function create(name, quantity) {
  const db = await connection();
  const { insertedId } = await db
    .collection('products')
    .insertOne({ name, quantity });

  return {
    _id: insertedId,
    name,
    quantity,
  };
}

async function update(id, name, quantity) {
  const db = await connection();
  const queryResult = await db
    .collection('products')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
      { returnOriginal: false },
    );

  if (!queryResult.value) return null;

  return queryResult.value;
}

async function remove(id) {
  const db = await connection();
  const queryResult = await db
    .collection('products')
    .findOneAndDelete(
      { _id: ObjectId(id) },
    );
  
  if (!queryResult.value) return null;
  
  return queryResult.value;
}

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  remove,
};
