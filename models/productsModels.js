const connection = require('./connection');
const { ObjectId, connect } = require('mongodb');

// CREATE PRODUCT
const create = async (name,quantity) => {
  const { insertedId } = await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }));
  return {
    _id: insertedId,
    name,
    quantity
  };
};

// FIND PRODUCT BY ID
const findById = async (id) => {
  return await connection()
    .then(mongodb => mongodb.collection('products').findOne(ObjectId(id)));
};

// FIND PRODUCT BY NAME
const findByName = async (name) => {
  return await connection()
    .then(mongodb => mongodb.collection('products').findOne({name}));
};

// EXPORT MODELS FUNCTIONS 
module.exports = {
  create,
  findById,
  findByName,
};