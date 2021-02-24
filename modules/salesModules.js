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
  connection().then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: data }}));
    
const deleteSale = (id) =>
  connection().then((db) => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
  updateSale,
  deleteSale,
};
