const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSaleModels = async (itensSold) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold })
      .then((item) => ({ _id: item.insertedId, itensSold }))
    );
};

// Lista todas as vendas 
const getAllSalesModels = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

// Lista vendas por ID
const getSaleByIdModels = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  createSaleModels,
  getAllSalesModels,
  getSaleByIdModels,
};
