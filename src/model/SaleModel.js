const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  return await connection().then((db) => db
    .collection('sales')
    .insertOne(sale));
};

module.exports = {
  createSale,
};
