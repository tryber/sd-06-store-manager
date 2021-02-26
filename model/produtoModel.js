const { response } = require('express');
const getconnection = require('./connection');
const { ObjectId } = require('mongodb');
const statusNumberError = 422;

const getAll = async () => {
  return await getconnection('products').then((db) => db.find().toArray());
};

const getId = async (id) => {
  return await getconnection('products').then((db) => db.findOne({ _id: ObjectId(id) }));
};

const putId = async (id, name, quantity) => {
  return await getconnection('products').then((db) =>
    db.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
};

const findNameExist = async (name) => {
  return await getconnection('products').then((db) => db.findOne({ name }));
};

const create = async (name, quantity) => {
  const { insertedId } = await getconnection('products').then((db) =>
    db.insertOne({ name, quantity }),
  );
  const newProduct = {
    _id: insertedId,
    name,
    quantity,
  };
  return newProduct;
};

const deleteProduct = async (id) => {
  await getconnection('products').then((db) => db.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  getId,
  putId,
  findNameExist,
  create,
  deleteProduct,
};
