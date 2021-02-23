const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const getAll = async () =>
  getCollection('sales')
    .then((db) => db.find({}).toArray());

const getById = async (id) =>
  getCollection('sales')
    .then((db) => db.findOne({ _id: ObjectId(id) }));

const createSale = async (product) => {
  const sales = getCollection('sales')
    .then((db) => db.insertOne({ itensSold: product }));
  return sales;
};

const updateSale = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const sales = getCollection('sales')
    .then((db) => db.updateOne(
      { _id: ObjectId(id) }, { $set: { itensSold: [{ productId, quantity }] } },
    ));
  return sales;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  getCollection('sales')
    .then((db) => db.deleteOne({ _id: ObjectId(id) }))
};

module.exports = { createSale, getAll, getById, updateSale, deleteSale };
