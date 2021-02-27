const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const salesById = async (id) => getConnection('sales')
  .then((sales) => sales.findOne(ObjectId(id)));

const sale = async (itensSold) =>
  getConnection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const showAllSales = async () => getConnection('sales')
  .then((sales) => sales.find().toArray());

const showSaleById = async (id) => getConnection('sales')
  .then((sales) => sales.findOne(ObjectId(id)));

const updateSale = async (id, productId, quantity) => getConnection('sales')
  .then((sales) =>
    sales.updateOne({ _id: ObjectId(id)}, { $set: { productId, quantity }}));

const deleteSale = async (id) => getConnection('sales')
  .then((sales) => sales.deleteOne({ _id: ObjectId }));

module.exports = {
  salesById,
  sale,
  showAllSales,
  showSaleById,
  updateSale,
  deleteSale,
};
