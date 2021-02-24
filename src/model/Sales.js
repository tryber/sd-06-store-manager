const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

// Find All Sales
const getAll = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

// // Find by Id Products
// const findById = async (id) => {
//   return await connection()
//     .then((db) => db.collection('sales').findOne(ObjectId(id)))
//     .catch( (error) => console.error(error)) ;
// };

// Add New Product
const create = async (itensSold) => {
  const { id } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .catch(err => console.error(err));
  return { id, itensSold };
};

// // Update Product
// const update = async (id, name, quantity) => {
//   await connection()
//     .then((db) => db.collection('products').updateOne(
//       { _id: ObjectId(id) },
//       { $set: { name, quantity } },
//     ).catch(err => console.error(err)));
//   return { id, name, quantity };
// };

// // Remove Product
// const remove = async (id) => {
//   return await connection()
//     .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
//     .catch(err => console.error(err));
// };


module.exports = {
  getAll,
  // findById,
  create,
  // update,
  // remove,
};
