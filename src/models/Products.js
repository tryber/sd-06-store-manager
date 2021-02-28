const connection = require('./connections');
const { ObjectID } = require('mongodb');

const create = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return {
    _id: insertedId,
    name,
    quantity
  };
};


const getAll = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const findByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .catch(err => console.error(err));
};

const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne(ObjectID(id)));
};

const update = async (id, name, quantity) => {
  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectID(id) },
      { $set: { name, quantity} }
    ));

  return {
    _id: id,
    name,
    quantity
  };
};

const remove = async (id) => {
  return await connection()
    .then((db) => db.collection('products').deleteOne( { _id: ObjectID(id) } ));
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
  update,
  remove
}; 