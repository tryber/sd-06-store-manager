const { response } = require('express');
const getconnection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await getconnection('products').then((db) => db.find().toArray());
};

const getId = async (id) => {
  return await getconnection('products').then((db) => db.findOne({ _id: ObjectId(id)}));
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
  getId,
  findNameExist,
  create,
};
