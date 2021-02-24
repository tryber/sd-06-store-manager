const connect = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connect().then((db) => db.collection('products').find({}).toArray());
};

const getById = async (id) => {
  const productId = await connect().then((db) => db.collection('products')
    .findOne(ObjectId(id)));
  return productId;
};

const getByName = async (name) => {
  return await connect().then((db) => db.collection('products').findOne({name}));
};

const postProduct = async ({ name, quantity }) => {
  const { insertedId } = await connect().then((db) => db.collection('products').insertOne(
    { name, quantity }
  ));
  return {
    _id: insertedId,
    name,
    quantity
  };
};

const putProduct = async ({ id, name, quantity }) => {
  const { insertedId } = await connect().then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }
  ));
  return {
    _id: insertedId,
    name,
    quantity
  };
};

const deleteProduct = async (id) => {
  return await connect().then((db) => db.collection('products').deleteOne(
    { _id: ObjectId(id) }
  ));
};

module.exports = {
  getAll,
  getById,
  getByName,
  putProduct,
  postProduct,
  deleteProduct,
};
