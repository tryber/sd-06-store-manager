const connection = require('./connection');
const { ObjectId } = require('mongodb');

const COLLECTION = 'sales';

const registerSale = async (itensSold) => {
  return await connection().then((db) => db.collection(COLLECTION)
    .insertOne({itensSold})
    .then((item) => ({
      _id: item.insertedId,
      itensSold
    }))
  );
};

const getAllSales = async () => {
  return await connection().then((db) => db.collection(COLLECTION).find().toArray());
};

const getById = async (id) => {
  const filter = ObjectId(id);
  return await connection().then((db) => db.collection(COLLECTION).findOne(filter));
};

const updateSale = async (id, saleItems) => {
  const filter = { _id: ObjectId(id) };
  const updateDoc = { $set: { itensSold: saleItems } };
    
  return await connection().then((db) => db.collection(COLLECTION)
    .updateOne(filter, updateDoc));
};

module.exports = {
  registerSale,
  getAllSales,
  getById,
  updateSale,
};
