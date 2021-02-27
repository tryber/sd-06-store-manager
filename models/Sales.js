const {ObjectId} = require('mongodb');
const connection = require('./connection');


const getAll = async () => {
  const db = await connection();
  return await db.collection('sales').find({}).toArray();
};

const getOne = async (id) => {
  const db = await connection();
  return await db.collection('sales').findOne({_id: ObjectId(id)});
};

const create = async (itensSold) => {
  const db = await connection();
  return db.collection('sales').insertOne({itensSold: [...itensSold]});
};

module.exports = {
  getAll, getOne, create
};