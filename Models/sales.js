const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  const saleObject = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }));
  const { insertedId } = saleObject;
  return {
    _id: insertedId,
    itensSold: sale,
  };
};

module.exports = {
  createSale
};