const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getAllSales = async () => {
  const sales = await connection('sales');

  return await sales.find().toArray();
};

const getASaleById = async (id) => {
  const sale = await connection('sales')
    .then((sales) => sales.findOne(ObjectId(id)));

  return sale;
};

const createASale = async (body) => {
  return await connection('sales')
    .then((sale) => sale.insertOne({ itensSold: body }))
    .then((sold) => sold.ops[0]);
};

const updateAsale = async (id, body) => {
  return await connection('sales')
    .then((sale) => sale.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: body } }))
    .then(() => ({ _id: id, itensSold: body }));
};

const removeASale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return await connection('sales').then((sales) => sales.deleteOne({ _id: ObjectId(id)}));
};

module.exports = {
  getAllSales,
  getASaleById,
  createASale,
  updateAsale,
  removeASale
};
