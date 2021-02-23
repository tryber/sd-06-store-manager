const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  // return await connection().then(db => db.collection('sales').find().toArray());
  const getAllItens = await connection()
    .then(db => db.collection('sales').find().toArray());
    // escrevendo 'sales' antes do retorno
  return {
    sales: getAllItens
  };
};

const create = async (itensSold) => {

  // console.log({itensSold});
  const { insertedId } = await connection()
    .then(db => db.collection('sales').insertOne({ itensSold }));

  return {
    _id: insertedId,
    itensSold: [{
      productId: insertedId,
      quantity: itensSold.quantity,
    }]
  };
};

const findById = async (id) => {
  const getAllItens = await connection()
    .then(db => db.collection('sales').findOne(ObjectId(id)));

  return {
    sales: getAllItens
  };
};

const update = async (id, quantity) => {
  return await connection().then(db => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { quantity } }
  ));
};

const remove = async (id) => {
  return await connection().then(db => db.collection('sales').deleteOne(
    { _id: ObjectId(id) }
  ));
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
};