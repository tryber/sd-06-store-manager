const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (itens) => {
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

const update = async (id, itens) => {
  const sale = await connection()
    .then((db) => db.collection('sales').updateOne(
      db.collection('sales').findOne({_id: ObjectId(id) }),
      {$set:{ itensSold: itens }}
    ));
  return sale;
};

const exclude = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id) }));
  return sale;
};


module.exports = {
  createSale,
  getAll,
  getById,
  update,
  exclude,
};