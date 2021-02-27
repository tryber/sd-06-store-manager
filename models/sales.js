const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }));

  return {
    _id: insertedId,
    itensSold: sale
  };
};

const getAll = async () => {
  return await connection().then(db => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  return await connection().then(db => db.collection('sales').findOne(ObjectId(id)));
};

// const update = async (id, itensSold) => {
//   return await connection().then(db => db.collection('sales').updateOne(
//     { _id: ObjectId(id) },
//     { $set: { itensSold } }
//   ));
// };

const update = async (id, itensSold) => {
  return await connection().then(db => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold } }
  ));
};

const remove = async (id) => {
  return await connection().then(db => db.collection('sales').deleteOne(
    { _id: ObjectId(id) }
  ));
};

module.exports = {
  getAll,
  createSale,
  findById,
  update,
  remove,
};
