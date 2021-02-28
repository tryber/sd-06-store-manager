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

const updateOne = async (id, sale) => {
  const db = await connection();
  return db.collection('sales').updateOne(
    {_id: id},
    { $set: {itensSold: sale}},
    {upsert: true}
  );

};

const deleteOne = async (id) => {
  const db = await connection();
  return await db.collection('sales').deleteOne(
    {_id: ObjectId(id)},
  );
};

module.exports = {
  getAll, getOne, create, updateOne, deleteOne
};