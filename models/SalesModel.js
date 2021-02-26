const { ObjectId } = require('mongodb');
const conn = require('./connection');

const insertSale = async (products) => {
  const { insertedId } = await conn()
    .then(db => db.collection('sales').insertOne({ itensSold: products }));
  return insertedId;
};

const getAll = async () => await conn()
  .then(db => db.collection('sales').find({}).toArray());

const findById = async (id) => await conn()
  .then(db => db.collection('sales').findOne(ObjectId(id)));

const updateSale = async (id, itensSold) => {
  const { modifiedCount } = await conn()
    .then(db => db.collection('sales').updateOne({_id: ObjectId(id)}, {
      $set: { 
        itensSold
      }
    }));
  return +modifiedCount;
};

const deleteSale = async (id) => conn()
  .then(db => db.collection('sales').deleteOne({_id: ObjectId(id)}));

module.exports = {
  insertSale,
  getAll,
  findById,
  updateSale,
  deleteSale,
};