const connection = require('./connection');
const mongo = require('mongodb');

const coll = 'sales';

const insertSale = async (sale) => {
  const { ops: [insertedSale] } = await connection().then((db) => (
    db.collection(coll).insertOne({ itensSold: sale })
  ));
  
  return insertedSale;
};

const getAll = async () => {
  return await connection().then((db) => db.collection(coll).find().toArray());
};

const getById = async (id) => {
  return await connection()
    .then((db) => db.collection(coll).findOne({ _id: mongo.ObjectId(id) }));
};

const updateOne = async (id, sale) => {
  const { value } = await connection().then((db) => db.collection(coll).findOneAndUpdate(
    { _id: mongo.ObjectID(id) },
    { $set: { itensSold: sale } },
    { returnOriginal: false }
  ));

  return value;
};

module.exports = {
  insertSale, 
  getAll, 
  getById,
  updateOne
};