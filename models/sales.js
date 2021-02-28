const connection = require('./connection');
const { ObjectId } = require('mongodb');

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

module.exports = {
  create,
  getAll,
  getById,
  upDate,
};
