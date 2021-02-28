const connection = require('./connections');
const { ObjectID } = require('mongodb');

const create = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold }));
  return {
    _id: insertedId,
    itensSold
  };
};


const getAll = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const findByName = async (name) => {
  return await connection()
    .then((db) => db.collection('sales').findOne({ name }))
    .catch(err => console.error(err));
};

const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne(ObjectID(id)))
    .catch(err => console.error(err));
};

const update = async (id, itensSold) => {
  await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectID(id) },
      { $set: { itensSold } }
    ));

  return {
    _id: id,
    itensSold
  };
};

const remove = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').deleteOne( { _id: ObjectID(id) } ));
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
  update,
  remove
}; 