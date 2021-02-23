const connection = require('./connections');
const { ObjectID } = require('mongodb');

const create = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return {
    id: insertedId,
    name,
    quantity
  };
};

const findByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .catch(err => console.error(err));
};

const getAll = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

// const update = async (id, name) => {
//   return await connection().then((db) => db.collection('recipes').updateOne(
//     { _id: ObjectID(id) },
//     { $set: { name } }
//   ));
// };

// const remove = async (id) => {
//   return await connection().then((db) => db.collection('recipes').deleteOne( { _id: ObjectID(id) } ));
// };

module.exports = {
  create,
  findByName,
  getAll
}; 