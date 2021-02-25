const connection = require('./connection');
const { ObjectId } = require('mongodb');

// Desafio 5 - Cadastra uma venda
const createSale = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  return {
    _id: insertedId,
    itensSold
  };
};

// Desafio 6 - Listar todas as vendas
const getAllSales = async() => {
  return { sales: await connection()
    .then((db) => db.collection('sales').find().toArray())};
};

// Desafio 6 - Busca uma venda pelo id
const findByIdSale = async(id) => {
  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

// Desafio 7 - Atualizar uma venda pelo id
const updateByIdSale = async(id, itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales')
      .updateOne({_id: ObjectId}, { $set:{ itensSold } }));
  return { _id: id, itensSold };
};

// Desafio 8 - Deletar uma venda pelo id
const deleteByIdSale = async(id) => {
  return await connection().then((db) => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  createSale,
  getAllSales,
  findByIdSale,
  updateByIdSale,
  deleteByIdSale,
};
