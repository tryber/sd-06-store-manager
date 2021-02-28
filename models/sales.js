const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  const sales = {
    itensSold: []
  };

  itensSold.forEach(element => {
    sales.itensSold.push(element);
  });

  const salesDB = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales.itensSold }));

  return {_id: salesDB.insertedId, itensSold: sales.itensSold }; 
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleById = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  return saleById;
};

module.exports = {
  create,
  getAll,
  getById,
};
