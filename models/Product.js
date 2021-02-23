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

async function create(name, quantity) {
  const db = await connection();

  const queryResult = await db
    .collection('products')
    .insertOne({ name, quantity });

  console.log(queryResult);
  return queryResult;
}

async function update(id, name, quantity) {
  const db = await connection();
  const queryResult = db
    .collection('products')
    .updateOne(
      { _id: ObjectId(id)},
      { $set: { name, quantity } },
    );
  
  return queryResult;
}

async function remove(id) {
  const db = await connection();
  const queryResult = await db
    .collection('products')
    .deleteOne(
      { _id: ObjectId(id) },
    );
  
  return queryResult;
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
