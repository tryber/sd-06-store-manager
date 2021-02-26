const connection = require('./connection');
const { ObjectId } = require('mongodb'); 

const getAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  console.log(sales);
  return sales;
};

const findById = async (id) => {
  const getId = connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return getId;
};

const create = async (itensSold) => {
  const creation = connection()
    .then((db) => db.collection('sales').insertOne({itensSold}));
  return creation;
};

module.exports = {
  getAll,
  findById,
  create,
};
