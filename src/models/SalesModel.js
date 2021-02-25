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

// const updateByIdProduct = async(id, name, quantity) => {
//   const { insertedId } = await connection()
//     .then((db) => db.collection('products')
//       .updateOne({_id: ObjectId},{ $set:{name, quantity}}));
//   return {
//     id: insertedId,
//     name,
//     quantity,
//   };
// };

// const deleteByIdProduct = async(id) => {
//   return await connection().then((db) => db.collection('products')
//     .deleteOne({_id: ObjectId}));
// };

// const findByName = async (name) => {
//   return await connection()
//     .then((db) => db.collection('products').findOne({ name }))
//     .catch(err => console.error(err));
// };

module.exports = {
  createSale,
  getAllSales,
  findByIdSale,
  // updateByIdProduct,
  // deleteByIdProduct,
  // findByName,
};
