const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  return await connection().then(db => db.collection('products').find().toArray());
};

const create = async (name, quantity) => {
  return await connection().then(db => 
    db.collection('products').insertOne({ name, quantity }));
};

const getByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne({ name }));
};

// 2
const getById = async (id) => {
  return await connection().then(db => 
    db.collection('products').findOne({ _id: ObjectId(id) }));
};
// 2

//3
const update = async (id, name, quantity) => {
  // return await connection().then(db => db.collection('products').updateOne(
  //   {_id: ObjectId(id) },
  //   { $set: {name, quantity}}
  // ));
  // tive que trocar para findOneAndUpdate para conseguir retornar o produto atualizado após edição
  return await connection().then(db => db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: {name, quantity} },
    { returnOriginal: false } // retorna o poduto atualizado após edição
  ));
};
//3

//4 ** Troquei o deleteOne por findOneAndDelete para retornar o porduto em Json
const remove = async (id, name, quantity) => {
  return await connection().then(db => db.collection('products').findOneAndDelete(
    { _id: ObjectId(id) },
    { $set: {name, quantity} }
  ));
};
//4

module.exports = {
  getAll,
  create,
  getByName,
  getById,
  update,
  remove
};