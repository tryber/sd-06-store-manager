const connect = require('./connection');
// const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connect().then((db) => db.collection('products').find({}).toArray());
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

module.exports = {
  getAll,
  getByName,
  postProduct,
};
