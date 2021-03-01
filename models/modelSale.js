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
  // console.log('insertedId', insertedId);
  return insertedId;
};

const updateSale = async (id, productId, quantity) => {
  const sale = await getCollection('sales')
    .then((sales) => sales.updateOne(
      { _id: ObjectId(id.toString()), productId, quantity },
      { $set: {  productId, quantity } },
    ));

  return sale;
};
const excludeSale = async (id) => await getCollection('sales').then((sale) => {
  sale.deleteOne({ _id: ObjectId(id)});
});
  

module.exports = {
  getAllSales,
  getByIdSale,
  createSale,
  updateSale,
  excludeSale,
};