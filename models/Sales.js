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

  if (sale) {
    return sale;
  }

  throw 'sale not found';
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

const deleteSale = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  if (sale) {
    await connection()
      .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
    return sale;
  }
  throw 'sale not found';
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};
