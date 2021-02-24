const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

// Find All Sales
const getAll = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

// Find by Id Sales
const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .catch((err) => console.error(err)) ;
};

// Add New Sale
const create = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .catch((err) => console.error(err));
  return { _id: insertedId, itensSold };
};

// Update Sale
const update = async (id, itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } }))
    .catch((err) => console.error(err));
  return { _id: insertedId, itensSold };
};

// // Remove Sale
// const remove = async (id) => {
//   return await connection()
//     .then((db) => db.collection('Sales').deleteOne({ _id: ObjectId(id) }))
//     .catch(err => console.error(err));
// };


module.exports = {
  getAll,
  findById,
  create,
  update,
  // remove,
};
