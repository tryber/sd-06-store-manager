const {ObjectId} = require('mongodb');
const connection = require('./connection');


const getAll = async () => {
  const db = await connection();
  return db.collection('sales').find({});
};

const getOne = async (id) => {
  const db = await connection();
  return db.collection('sales').find({_id: ObjectId(id)});
};

const create = async (productId, quantity) => {
  const db = await connection();
  return db.collection('sales').insertOne({productId, quantity});
};

module.exports = {
  getAll, getOne, create
};