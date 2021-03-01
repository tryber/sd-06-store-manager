const { connect, ObjectId } = require('mongodb');
const connection = require('./connection');

const addSales = async (products) => {
  const { itensSold } = products;
  const { insertedId } =  await connection()
    .then((db) => db.collection('sales').insertOne(products));
  return { _id: insertedId, itensSold };
};

const getAllSales = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const getSalesById = async (id) => {
  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  addSales,
  getAllSales,
  getSalesById,
};
