const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { connect } = require('../controllers/salesController');

const create = async (itensSold) => {
  const sales = {
    itensSold: [],
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

const upDate = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } } ));

  const updateSale = {
    _id: ObjectId(id),
    itensSold
  };

  return updateSale;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleById = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

  return saleById;
};

module.exports = {
  create,
  getAll,
  getById,
  upDate,
  exclude,
};
