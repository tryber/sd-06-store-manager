const connect = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allSales = await connect().then((db) => db.collection('sales')
    .find({}).toArray());
  return { sales: allSales };
};

const getById = async (id) => {
  return await connect().then((db) => db.collection('sales')
    .findOne({ _id: ObjectId(id) }));
};

const postSale = async (sale) => {
  const { insertedId } = await connect().then((db) => db.collection('sales').insertOne(
    { itensSold: sale }
  ));
  return {
    _id: insertedId,
    itensSold: sale
  };
};

const putSale = async (id, sale) => {
  await connect().then((db) => db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold: sale } }
  ));
  return {
    _id: id,
    itensSold: sale
  };
};

const deleteSale = async (id) => {
  return await connect().then(db => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));
};


module.exports = {
  getAll,
  getById,
  postSale,
  putSale,
  deleteSale,
};
