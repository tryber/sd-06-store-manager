const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itens) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ 
      itensSold: itens
    }));
  return ({_id: insertedId, itensSold: itens });
};

const getAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return sales;
};

const getById = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectId(id) }));
  return sale;

};


module.exports = {
  create,
  getAll,
  getById,
};