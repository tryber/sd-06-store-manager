const connection  = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const postSale = async (sale) => {
  const saleCreate = await connection()
    .then((db) => db.collection('sales')
      .insertOne(({ itensSold: sale }))
    );
  return saleCreate.ops[0];
};

const findSaleById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const saleUpdate = async (id, itensSold) => {
  return connection()
    .then((db) => { db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: {itensSold} });
    });
};

const saleDelete = async (id) => {
  return connection()
    .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id)}));
};

module.exports = {
  getAllSales,
  postSale,
  findSaleById,
  saleUpdate,
  saleDelete,
};
