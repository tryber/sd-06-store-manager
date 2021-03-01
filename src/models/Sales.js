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


module.exports = {
  createNewSale
};
