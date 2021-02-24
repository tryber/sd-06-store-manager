const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const sales = await connection()
    .then(db => db.collection('sales').find().toArray());
  
  return { sales: sales };
};

const getById = async (id) => {
  return await connection().then(db => db.collection('sales').findOne(ObjectId(id)));
};

const create = async (arraySales) => {
  // console.log(productId,quantity );
  const { insertedId } = await connection().then(db => db.collection('sales')
    .insertOne({ 'itensSold': arraySales}));

  return {
    _id: insertedId,
    'itensSold': arraySales
  };
};

module.exports = {
  getAll,
  getById,
  create
};