const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then(db => db.collection('sales').find().toArray());
};

const create = async (quantity) => {
  const { insertedId } = await connection()
    .then(db => db.collection('sales').insertOne({ quantity }));

  return {
    id: insertedId,
    itensSold: [{
      productId: insertedId,
      quantity
    }]
  };
};

const findById = async (id) => {
  return await connection().then(db => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, quantity) => {
  return await connection().then(db => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { quantity } }
  ));
};

const remove = async (id) => {
  return await connection().then(db => db.collection('sales').deleteOne(
    { _id: ObjectId(id) }
  ));
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
};