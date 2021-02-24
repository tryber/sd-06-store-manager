const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

// Find All Sales
const getAll = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

// // Find by Id Sales
// const findById = async (id) => {
//   return await connection()
//     .then((db) => db.collection('sales').findOne(ObjectId(id)))
//     .catch( (error) => console.error(error)) ;
// };

// Add New Sale
const create = async (itensSold) => {
  
  const { id } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .catch(err => console.error(err));
  return { _id: id, itensSold };
};

// // Update Sale
// const update = async (id, name, quantity) => {
//   await connection()
//     .then((db) => db.collection('Sales').updateOne(
//       { _id: ObjectId(id) },
//       { $set: { name, quantity } },
//     ).catch(err => console.error(err)));
//   return { id, name, quantity };
// };

// // Remove Sale
// const remove = async (id) => {
//   return await connection()
//     .then((db) => db.collection('Sales').deleteOne({ _id: ObjectId(id) }))
//     .catch(err => console.error(err));
// };


module.exports = {
  getAll,
  // findById,
  create,
  // update,
  // remove,
};
