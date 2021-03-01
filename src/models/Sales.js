const connection = require('./connection');
const { ObjectId } = require('mongodb');

const DB_COLECTION = 'sales';

const createNewSale = async (objectSales) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('sales').insertOne({ 
      itensSold: objectSales }),
  );

  return {
    _id: insertedId,
    itensSold: objectSales,
  };
};

const getAllSales = async () => {
  return connection()
    .then((db) => db.collection(DB_COLECTION).find().toArray());
};

const getByIdSales = async (id) => {
  return connection()
    .then((db) => db.collection(DB_COLECTION).findOne(ObjectId(id)));
};


module.exports = {
  createNewSale,
  getAllSales,
  getByIdSales
};
