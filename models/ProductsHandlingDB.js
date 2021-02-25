const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const getProducts ={ 
    products: await connection().then(db => db.collection('products').find().toArray())};
  return getProducts;
};

const findByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne({name}));
};

const findById = async (id) => {
  return await connection().then(db => db.collection('products').findOne(ObjectId(id)));
};

const create = async (name,quantity) => {
  const { insertedId } = await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }));
  return {
    _id: insertedId,
    name,
    quantity
  };
};

const update = async (id,name, quantity) => {
  const updateProduct = await connection().then(db => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name,quantity } },      
  ));
  const _id =id;
  if(updateProduct) return {_id,name,quantity};
  return {message: 'nada feito'};
};

module.exports = {create, findByName, getAll, findById, update};
