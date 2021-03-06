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

// Atualiza uma venda
const updateSaleModels = async (id, sale) => {
  return await connection().then((db) => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: sale } }
  ));
};

// Exclui uma venda
const deleteSaleModels = async (id) => {
  return await connection().then((db) => db.collection('sales').deleteOne(
    { _id: ObjectId(id) }
  ));
};

module.exports = {
  createSaleModels,
  getAllSalesModels,
  getSaleByIdModels,
  updateSaleModels,
  deleteSaleModels,
};
