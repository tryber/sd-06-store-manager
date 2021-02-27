const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  return await connection().then(db => db.collection('sales').find().toArray());
};

const create = async (itensSold) => {
  return await connection().then(db => 
    db.collection('sales').insertOne({ itensSold }));
};

// 6
const getById = async (id) => {
  return await connection().then(db => 
    db.collection('sales').findOne({ _id: ObjectId(id) }));
};
// 6

// 7
const update = async (id, itensSold) => {
  // Trocar para findOneAndUpdate para conseguir retornar o produto atualizado após edição
  return await connection().then(db => db.collection('sales').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { itensSold } },
    { returnOriginal: false } // retorna o poduto atualizado após edição
  ));
};
// 7

// 8 ** Troquei o deleteOne por findOneAndDelete para retornar o porduto em Json
const remove = async (id, itensSold) => {
  return await connection().then(db => db.collection('sales').findOneAndDelete(
    { _id: ObjectId(id) },
    { $set: { itensSold } },
  ));
};
// 8 

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove
};