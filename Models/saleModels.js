const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  if(sale.length > 1 ) {
    const { insertedId } = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold: [...sale] }));

    const createdSales = await connection()
      .then((db) => db.collection('sales').findOne({ _id: ObjectId(insertedId) }));

    return createdSales;
  }

  if(sale.length === undefined) {
    const { insertedId } = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold: [sale] }));

    const createdSale = await connection()
      .then((db) => db.collection('sales').findOne({ _id: ObjectId(insertedId) }));

    return createdSale;
  }
};

const getAll = async () => {
  return await connection().then((db => db.collection('sales')
    .find().toArray()));
};

const findById = async (id) => {
  return await connection().then((db => db.collection('sales')
    .findOne({ _id: ObjectId(id) })));
};

module.exports = {
  create,
  getAll,
  findById
};
