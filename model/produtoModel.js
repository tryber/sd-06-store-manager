const { response } = require('express');
const getconnection = require('./connection');

const getAll = async () => {
  return await getconnection('products').then((db) => db.find().toArray());
};

const findNameExist = async (name) => {
  return await getconnection('products').then((db) => db.findOne({name}));
};

const create = async (name, quantity) => {
  const { insertedId } = await getconnection('products').then((db) => db.insertOne
  ({ name, quantity }));
  const newProduct = {
    _id: insertedId,
    name,
    quantity
  };
  return newProduct;

};
module.exports = {
  getAll,
  findNameExist,
  create,
};
