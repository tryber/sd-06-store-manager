const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (result) => {
  const { insertedId } = await connection()
    .then(mongodb => mongodb.collection('sales').insertOne({
      itensSold: result
    }));

  return insertedId;
};

const getAllSales = async () => {
  return { sales: await connection()
    .then(mongodb => mongodb.collection('sales').find().toArray())};
};

const getSaleUnit = async (id) => {
  return await connection()
    .then(mongodb => mongodb.collection('sales').findOne(ObjectId(id)));
};

const updateSaleUnit = async (id, updateValue) => {
  await connection().then(mongodb => mongodb.collection('sales').updateOne(
    {_id: ObjectId(id)},
    {$set:{updateValue}}
  ));
  const _id = id;
  return {_id, updateValue};
};

module.exports = {
  createSale,
  getAllSales,
  getSaleUnit,
  updateSaleUnit
};