const connection = require('./connection');
const { ObjectId } = require('mongodb');
const collectionName = 'sales';

const createSale = async (arraySales) => {
  const { insertedId }  = await connection()
    .then((db) => db.collection(collectionName).insertOne({
      itensSold: arraySales
    }));
    
  return  insertedId ;
};

const getSaleById = async (id) => {
  return await connection()
    .then((db) => db.collection(collectionName).findOne(ObjectId(id)));
};

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection(collectionName).find().toArray());
};

const updateSalesById = async (id, sale) => {
  return await connection()
    .then((db) => db.collection(collectionName).updateOne({
      _id: ObjectId(id)
    },
    {
      $set:{itensSold: sale}
    }
    ));
};

const deleteSalesById = async (id) => {
  const sale = await connection()
    .then((db) => db.collection(collectionName).findOne(ObjectId(id)));

  if(!sale) return false;

  await connection()
    .then((db) => db.collection(collectionName).deleteOne({
      _id: ObjectId(id)
    }));

  return sale;
};

module.exports = {
  createSale,
  getSaleById,
  getAllSales,
  updateSalesById,
  deleteSalesById
};
