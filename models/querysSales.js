const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSales = async (products) => {
  return await connection().then((db) => db.collection('sales').insertOne(
    { itensSold: products }
  ));
};

const findSalesByMongoId = async (salesId) => {
  return await connection()
    .then((db) => db.collection('sales')
      .find({ _id: new ObjectId(salesId) }).toArray());
};

const getAll = async () => {
  return await connection()
    .then(db => db.collection('sales').find().toArray());
};

const findSalesByProductId = async (id) => {
  return await connection()
    .then((db) => db.collection('sales')
      .find({ itensSold: { $elemMatch: { productId: id } } }).toArray());
};

const updateSale = async (id, itensSold) => {
  await connection()
    .then(db => db.collection('sales')
      .updateOne({ _id: ObjectId(id) },
        { $set: { itensSold }}));
};
///////////
const deleteSale = async (id) => {
  return await connection()
    .then(db => db.collection('sales').deleteOne({ _id: new ObjectId(id) }));
};


module.exports = {
  createSales,
  getAll,
  findSalesByMongoId,
  updateSale,
  deleteSale,
  findSalesByProductId
};
