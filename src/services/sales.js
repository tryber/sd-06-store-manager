const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((products) => products);
};

const findSaleById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .catch(err => err.message);

  if (!product || typeof product !== 'object') return null;

  return product;
};

const createSale = async (data) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ 'itensSold': data }));
};

const update = async (id, productId, quantity) => {
  return await connection()
    .then((db) => db.collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { 'itensSold': [{ 'productId': productId, 'quantity': quantity }] } }
      ));
};

const removeSale = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllSales,
  findSaleById,
  createSale,
  update,
  removeSale
};