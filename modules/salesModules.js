const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = () => 
  connection().then((db) => db.collection('sales').find().toArray());

const createSale = async (data) => {
  const sale =  await connection().then((db) => db.collection('sales')
    .insertOne({ itensSold: data }));

  const { insertedId } = sale;
  
  return {
    _id: insertedId,
    itensSold: data,
  };
};

const getSaleById = (id) =>
  connection().then((db) => db.collection('sales').findOne(ObjectId(id)));

const updateSale = (id, data) =>
  connection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: data }}));

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
  updateSale,
};
