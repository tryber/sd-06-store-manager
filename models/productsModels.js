const connection = require('./connection');
const { ObjectId } = require('mongodb');

const COLLECTION = 'products';

const createNewProduct = async (name, quantity) => {
  const { insertedId } =
    await connection()
      .then((db) => db.collection(COLLECTION)
        .insertOne({ name, quantity }));

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const getAll = async () => {
  return await connection().then((db) => db.collection(COLLECTION).find().toArray());
};

const getByName = async (name) => {
  return await connection().then((db) => db.collection(COLLECTION).findOne({ name }));
};

const getById = async (id) => {
  return await connection().then((db) => db.collection(COLLECTION).findOne(ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  await connection().then((db) => db.collection(COLLECTION)
    .updateOne(
      {_id: ObjectId(id)},
      {$set: { name, quantity}}
    ));

  return {
    _id: id,
    name,
    quantity,
  };
};

const deleteProducts = async (id) => {
  await connection()
    .then((db) => db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) }));

  // return { _id: id, name, quantity };
};

module.exports = {
  getAll,
  createNewProduct,
  getByName,
  deleteProducts,
  getById,
  updateProduct,
};
