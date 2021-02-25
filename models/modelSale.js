const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const getAllSales = async () => { 
  return getCollection('sales').then((sale) => sale.find().toArray());
};

const getByIdSale = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return getCollection('sales').then((sale) => sale.findOne(ObjectId(id)));
};

const createSale = async ({ quantity }) => {
  const sale = await getCollection('sales').then((sale) =>
    sale.insertOne({ quantity }));

  return { _id: sale.insertedId, quantity };
};

const updateSale = async ({ id, quantity }) => {
  if(!ObjectId.isValid(id)) return null;

  const sale = await getCollection('sales').then((sale) =>
    sale.updateOne({ _id: ObjectId(id)}, { $set: { quantity}}));

  return sale;
};

const getByNameAndQuantity = async ({quantity }) => {
  return getCollection('sales').then((sale) => sale.findOne({ quantity }));
};

const excludeSale = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return getCollection('sales').then((sale) => {
    return sale.deleteOne({ _id: ObjectId(id)});
  });
};

module.exports = {
  getAllSales,
  getByIdSale,
  createSale,
  updateSale,
  getByNameAndQuantity,
  excludeSale,
};