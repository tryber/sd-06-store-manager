const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const db = await connection();

  const { insertedId } = await db.collection('products').insertOne({
    name,
    quantity,
  });

  return ({
    id: insertedId,
    name,
    quantity,
  });
};

const getByName = async (name) => {
  const db = await connection();
  try {
    const product = await db.collection('products').findOne({ name });
    return product;
  } catch (err) {
    return null;
  }
};
  

// const getAll = async () => {
//   return await connection()
//     .then((db) => db.collection('products').find().toArray());
// };

// const getById = async (id) => {
//   const product = await connection()
//     .then((db) => db.collection('products').findOne(ObjectId(id)));
//   return product;
// };

// const delById = async (id) => {
//   connection()
//     .then((db) => db.collection('products').deleteOne({ '_id': ObjectId(id) }));
// };

module.exports = {
  create,
  getByName,
  // getAll,
  // getById,
  // delById,
};
