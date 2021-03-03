const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (sales) => {
  return await connection()
    .then((item) => item.collection('sales').insertOne({itensSold: sales }));
};

const getSales = async (id) => {
  if (id) {
    return await connection()
      .then((item) => item.collection('sales').findOne(ObjectID(id)));
  }
  return await connection()
    .then((item) => item.collection('sales').find().toArray());
};

const changeSales = async (id, sale) => {
  return await connection()
    .then((item) => item.collection('sales')
      .updateOne({ _id: id }, { $set: { itensSold: sale } }));
};

module.exports = {
  create,
  getSales,
  changeSales
};
