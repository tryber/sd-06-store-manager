const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  return await connection().then((db) => db
    .collection('sales')
    .insertOne(sale));
};

const findAllSales = async () => {
  return await connection().then((db) => db
    .collection('sales')
    .find()
    .toArray()
  );
};

const findSaleById = async (id) => {
  return await connection().then((db) => db
    .collection('sales')
    .findOne({ _id: ObjectId(id) })
  );
};

module.exports = {
  createSale,
  findAllSales,
  findSaleById,
};
