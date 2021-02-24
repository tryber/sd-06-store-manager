const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertSales = async (sales) => await connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sales }));


module.exports = {
  insertSales,
};
