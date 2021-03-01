const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerSale = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold }));

  return {
    _id: insertedId,
    itensSold,
  };
};

const getSales = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return sales;
};

const getSaleById = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  return sale;
};

const updateSale = async (id, itensSold) => {
  await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } }
    ));

  return {
    _id: id,
    itensSold
  };
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
  updateSale,
};
