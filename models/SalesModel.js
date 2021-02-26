const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () =>
  await connection()
    .then(db => db.collection('sales').find().toArray());

const createSale = async (element) => {
  const { insertedId } = await connection()
    .then(db => db.collection('sales').insertOne({
      itensSold: element
    }));

  return {
    _id: insertedId,
    itensSold: element,
  };
};

const getBySalesId = async (id) => {
  return await connection()
    .then(db => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  getAllSales,
  createSale,
  getBySalesId,
};
