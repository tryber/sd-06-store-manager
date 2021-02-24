const connection = require('../database');
const { ObjectId } = require('mongodb');

const createSale = async (body) => {
  const newSale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: body })
  );

  return newSale;
};

const allSales = async () => {
  const sales = await connection().then((db) =>
    db.collection('sales').find().toArray()
  );

  return sales;
};

const filterSaleById = async (id) => {
  const sale = await connection().then((db) =>
    db.collection('sales').findOne({ _id: ObjectId(id) })
  );

  return sale;
};

const updateSale = async (body, id) => {
  const sale = await connection().then((db) =>
    db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: body }  })
  );

  return sale;
};

module.exports = {
  createSale,
  allSales,
  filterSaleById,
  updateSale
};

