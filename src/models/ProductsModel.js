const connection = require('./connection');
const { ObjectId } = require('mongodb');

// Desafio 1 - Cadastra um produto
const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

// Desafio 2 - Busca todos os produtos
const getAllProducts = async() => {
  return { products: await connection()
    .then((db) => db.collection('products').find().toArray())};
};

// Desafio 2 - Busca um produto pelo id
const findByIdProduct = async(id) => {
  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

// Desafio 3 - Atualizar um produto pelo id
const updateByIdProduct = async(id, name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products')
      .updateOne({_id: ObjectId},{ $set:{name, quantity}}));
  return {
    id: insertedId,
    name,
    quantity,
  };
};

// Desafio 4 - Deletar um produto pelo id
const deleteByIdProduct = async(id) => {
  return await connection().then((db) => db.collection('products')
    .deleteOne({_id: ObjectId}));
};

const findByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .catch(err => console.error(err));
};

module.exports = {
  createProduct,
  getAllProducts,
  findByIdProduct,
  updateByIdProduct,
  deleteByIdProduct,
  findByName,
};
