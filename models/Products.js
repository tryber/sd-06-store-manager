const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const products = await connection()
    .then(db => db.collection('products').find().toArray());
  
  return { products: products };
};

const getById = async (id) => {
  return await connection().then(db => db.collection('products').findOne(ObjectId(id)));
};

const create = async (name, quantity) => {
  const { insertedId } = await connection().then(db => db.collection('products')
    .insertOne({ name: name, quantity: quantity }));

  return {
    _id: insertedId,
    name: name,
    quantity: quantity
  };
};

const update = async (id, name, quantity) => {
  await connection().then(db => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }
  ));

  return {
    _id: id,
    name: name,
    quantity: quantity
  };
};

const checkName = async (name) => {
  const check =  await connection().then(db => db.collection('products')
    .findOne({ name: name }));
  // console.log(check);
  if (check) return true;
  return false;
};

const remove = async (id) => {
  const { name, quantity } = await connection().then(db => db.collection('products')
    .findOne(ObjectId(id)));
  
  await connection().then(db => db.collection('products')
    .deleteOne({ _id: ObjectId(id)}));

  return {
    _id: id,
    name: name,
    quantity: quantity
  };
};

module.exports = {
  getAll,
  getById,
  create,
  checkName,
  update,
  remove
};
