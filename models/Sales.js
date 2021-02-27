const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const register = async (items) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: items}));

  return {
    _id: insertedId,
    itensSold: items,
  };
};

const update = async (id, sale) => {
  return await connection().then((db) =>
    db.collection('sales')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { itensSold: sale } },
        { returnOriginal: false },
      )
  );
};

module.exports = {
  getAll,
  findById,
  register,
  update,
};
