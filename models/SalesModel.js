const connection = require('./connection');
const {ObjectId} = require('mongodb');

const create = async (itens) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales')
      .insertOne({itensSold: itens}));
  return ({_id: insertedId, itensSold: itens});
};

const getAll = async () => {
  const result = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return result;
};

const getSaleById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('sale').findOne({_id: ObjectId(id) }));
  return result;
};

const deleteSale = async (id) => {
  const result = await connection()
    .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id) }));
  return result;
};

module.exports = {
  create,
  getAll,
  getSaleById,
  deleteSale,
};