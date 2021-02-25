const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  if(sale.length > 1 ) {
    const { insertedId } = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold: [...sale] }));

    const createdSales = await connection()
      .then((db) => db.collection('sales').findOne({ _id: ObjectId(insertedId) }));

    return createdSales;
  } else {
    const { insertedId } = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold: sale }));

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

const updateById = async (id, sale) => {
  await connection().then((db) => db.collection('sales')
    .updateOne(
      { _id: ObjectId(id)},
      { $set: {
        'itensSold': [...sale]
      } }
    ));

  const updatedSale = await connection().then((db => db.collection('sales')
    .findOne({ _id: ObjectId(id) })));

  return updatedSale;
};

module.exports = {
  create,
  getAll,
  findById,
  updateById
};
