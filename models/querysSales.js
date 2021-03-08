const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSales = async (products) => {
  return await connection().then((db) => db.collection('sales').insertOne(
    { itensSold: products }
  ));
};

const findSalesByProduct = async (salesId) => {
  return await connection()
    .then((db) => db.collection('sales')
      .find({ _id: new ObjectId(salesId) }));
};

const getAll = async () => {
  return await connection()
    .then(db => db.collection('sales').find().toArray());
};


module.exports = {
  createSales,
  getAll,
  findSalesByProduct
};
