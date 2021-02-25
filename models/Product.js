const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  return await db.collection('products').find({}).toArray();
};

const getOne = async (id) => {
  const db = await connection();
  return await db.collection('products').findOne({_id: ObjectId(id)});
};

const update = async (id, name, quantity) => {
  const db = await connection();
  return await db.collection('products')
    .updateOne(
      { _id: id  },
      { $set: { name, quantity } },
      { upsert: true }
    );}; 

const getOneByName = async (name) => {
  const db = await connection();
  return db.collection('products').findOne({name});
};

const createOne = async (product) => {
  const {name, quantity} = product;
  const db = await  connection();  
  return db.collection('products').insertOne({name, quantity});
};

module.exports = {
  getAll, getOne, createOne, getOneByName, update
};



