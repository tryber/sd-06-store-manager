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

const update = async (id, itensSold) => {
  const update = connection()
    .then((db)=> db.collection('sales').updateOne({_id: ObjectId(id), $set: itensSold}));
  return update;
};

const remove = async (id) => {
  const removing = connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id)}));
  return removing;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
