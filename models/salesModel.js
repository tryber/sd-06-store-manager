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


module.exports = {
  getAllSales,
  postSale,
  findSaleById,
};
