const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  const { insertedId } = await connection()
    .then(db => db.collection('sales').insertOne( { itensSold } ));
 
  return  {
    _id: insertedId,
    itensSold
  };
};

const getAll = async () => {
  const listAll = {
    sales: await connection().then(db => db.collection('sales').find().toArray())
  };
  return listAll;
};

const getForId = async (id) => {
  return await connection().then(db => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = { create, getAll, getForId };