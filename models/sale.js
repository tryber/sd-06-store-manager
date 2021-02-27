const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async() => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const getSaleById = async(id) => {
  const db = await connection();
  return db.collection('sales').findOne({ _id: ObjectId(id)});
};

const createSale = async(sale) => {
  const sales = await connection()
    .then((db)=> db.collection('sales').insertOne({itensSold: sale}));
  const { insertedId } = sales;
  return {
    _id: insertedId,
    itensSold: sale //sale é objeto pronto, que criado
  };
};

module.exports = {
  getAll,
  createSale,
  getSaleById
};
