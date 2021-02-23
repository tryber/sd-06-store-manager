const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const produtoCriado = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => ({ _id: result.insertedId, name, quantity }));
  return produtoCriado;
};

// const repeatFind = async (name) => {
//   const repeated = await connection()
//     .then((db) => db.collection('products').find({name: name}));
//   return false;
// };

const getAllProducts = async () => await connection()
  .then((db) => db.collection('products').find().toArray());

module.exports = {
  create,
  // repeatFind,
  getAllProducts
};
