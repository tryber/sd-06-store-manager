const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const all = await connection('sales').then(db => db.find().toArray());

  return {
    sales: all
  };
};

const findById = async (id) => {
  return await connection('sales').then(db => db.findOne(ObjectId(id)));
};

const findByName = async (name) => {
  return await connection('sales').then(db => db.findOne({ name }));
};

const create = async (products) => {
  const sale = await connection('sales')
    .then(db => db.insertOne({ itensSold: products }));

  return {
    _id: sale.insertedId,
    itensSold: products,
  };
};

const update = async (id, itensSold) => {
  return await connection('sales').then(db => db.updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold } }
  ));
};

const remove = async (id) => {
  return await connection('sales').then(db => db.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  remove,
};
