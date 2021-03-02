const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const data = await connection().then(db => db.collection('sales').find().toArray());
  return { sales: data };
};

const getById = async (id) => {
  return await connection().then(db => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, sales) => {
  await connection().then(db => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } }));
  return {
    _id: id,
    itensSold: sales,
  };
};

const remove = async (id) => {
  return await connection().then(db => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));
};

const create = async (sales) => {
  const { insertedId } = await connection().then(db => db.collection('sales')
    .insertOne({ itensSold: sales }));
  return {
    _id: insertedId,
    itensSold: sales,
  };
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove
};
