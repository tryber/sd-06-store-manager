const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'products';

const getAll = async () => {
  return await connection().then((db) => db.collection(collection).find().toArray());
};

const findByName = async (nameToSearch) => {
  return await connection().then((db) => db.collection(collection)
    .find({ name: nameToSearch }).toArray());
};

const findById = async (id) => {
  return await connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const insertProduct = async (name, qnt) => {
  const { insertedId } = await connection().then((db) => db.
    collection(collection).insertOne({ name, quantity: qnt }));

  return ({
    _id: insertedId.toString(),
    name,
    quantity: qnt,
  });
};

const updateProduct = async (id, name, qnt) => {
  return await connection().then((db) => db.collection(collection).
    updateOne(
      {_id: ObjectId(id) },
      { $set: { name, quantity: qnt}}
    ));
};

const deleteProduct = async (id) => {
  return await connection().then((db) => db.collection(collection)
    .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  findByName,
  findById,
  insertProduct,
  updateProduct,
  deleteProduct
};
