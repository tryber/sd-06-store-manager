const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function getAll() {
  const db = await connection();
  const queryResult = db
    .collection('sales')
    .find()
    .toArray();

  return queryResult;  
}

async function findById(id) {
  const db = await connection();
  const queryResult = await db
    .collection('sales')
    .findOne(ObjectId(id));

  return queryResult;
};

async function create(productsSold) {
  const db = await connection();
  const { insertedId } = await db
    .collection('sales')
    .insertOne(
      { itensSold: productsSold },
    );

  return {
    _id: insertedId,
    itensSold: productsSold,
  };
}

async function update(id, productsSold) {
  const db = await connection();
  const queryResult = await db
    .collection('sales')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold: productsSold } },
      { returnOriginal: false },
    );

  if (!queryResult.value) return null;

  return queryResult.value;
}

async function remove(id) {
  const db = await connection();
  const queryResult = await db
    .collection('sales')
    .findOneAndDelete(
      { _id: ObjectId(id) },
    );

  if (!queryResult.value) return null;

  return queryResult.value;
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};