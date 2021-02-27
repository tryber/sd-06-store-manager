const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const getAllSales = async () => { 
  return getCollection('sales').then((sale) => sale.find().toArray());
};

const getByIdSale = async (id) => {
  return getCollection('sales').then((sale) => sale.findOne(ObjectId(id)));
};

const createSale = async (product) => {
  const { insertedId } = await getCollection('sales').then((sale) =>
    sale.insertOne({itensSold: product}));
  console.log('insertedId', insertedId);
  return insertedId;
};

const updateSale = async (id, productId, quantity) => {
  const sale = await getCollection('sales')
    .then((sales) => sales.updateOne(
      { _id: ObjectId(id), 'itensSold.productId': productId },
      { $set: { 'intensSold[0].quantity': quantity } },
    ));

  return sale;
};

const excludeSale = async (id) => {
  const exclude = await getCollection('sales').then((sale) => {
    sale.deleteOne({ _id: ObjectId(id)});
  });
  return exclude;
};

module.exports = {
  getAllSales,
  getByIdSale,
  createSale,
  updateSale,
  excludeSale,
};