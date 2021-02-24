const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const getAllItens = await connection()
    .then(db => db.collection('products').find().toArray());
  return {
    products: getAllItens
  };
};

const create = async (name, quantity) => {
  console.log(name, quantity);
  const { insertedId } = await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }));

  return {
    _id: insertedId,
    name,
    quantity
  };
};

const findById = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  return await connection()
    .then(db => db.collection('products').findOne(ObjectId(id)));  
};

const findByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne( { name } ));

};

const update = async (id, name, quantity) => {
  if(!ObjectId.isValid(id)) return null;

  await connection().then(db => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }
  ));

  return {
    _id: ObjectId(id),
    name,
    quantity
  };
};

const remove = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  const check = await findById(id);
  if (!check) {
    return null;
  }
  await connection().then(db => db.collection('products').deleteOne(
    { _id: ObjectId(id) }
  ));
  return check;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
  findByName,
};