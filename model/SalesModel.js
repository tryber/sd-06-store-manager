const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }));
  return result.ops[0];
};

const findSaleByItensSold = async (itens) => {
  return connection()
    .then((db) => db.collection('sales').findOne({ itensSold: itens }));
};

const findAllSales = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const findSaleById = async (id) => {
  return connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const updateSale = async (id, itens) => {
  return connection()
    .then((db) => {
      db.collection('sales')
        .updateOne({ _id: Object(id) }, { $set: {itensSold: itens} });
    });
};

const deleteSale = async (id) => {
  return connection()
    .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id)}));
};

module.exports = {
  createSale,
  findSaleByItensSold,
  findAllSales,
  findSaleById,
  updateSale,
  deleteSale
};
