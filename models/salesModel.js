const connection = require('./connection');
const { ObjectID } = require('mongodb');

const getAll = async (collection) => await connection()
  .then((db) => db.collection(collection).find().toArray());

const findById = async (collection, id) => await connection()
  .then((db) => db.collection(collection).findOne(ObjectID(id)));

const addProduct  = async (collection, product) => await connection()
  .then((db) => db.collection(collection).insertOne(product));

const nameExists = async (collection, name) => await connection()
  .then((db) => db.collection(collection)
    .find({ name: name }, { _id: 1 }).toArray());

const updateForId = async (collection, id, objUpdate) => await connection()
  .then((db) => db.collection(collection)
    .updateOne({ _id: ObjectID(id) }, { $set: objUpdate }));

const deleteForId = async (collection, id) => await connection()
  .then((db) => db.collection(collection).deleteOne({ _id: ObjectID(id) }));

module.exports = {
  getAll,
  findById,
  addProduct,
  nameExists,
  updateForId,
  deleteForId
};
