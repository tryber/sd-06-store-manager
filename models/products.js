const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return {_id: product.insertedId, name, quantity }; 
};

const findNameProduct = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productById = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  return productById;
};

const upDate = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  await connection()
    .then((db) => db.collection('products')
      .updateOne({_id: ObjectId(id) }, { $set: { name, quantity} }));

  const productById = {
    _id: ObjectId(id),
    name,
    quantity,
  };

  return productById;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productById = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

  return productById;
};

module.exports = {
  create,
  findNameProduct,
  getAll,
  getById,
  upDate,
  exclude,
};
