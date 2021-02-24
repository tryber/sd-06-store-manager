const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('products')
      .find().toArray());

  return {
    products: allProducts
  };
};

const findById = async (id) => {
  const productById = await connection()
    .then((db) => db.collection('products')
      .findOne(ObjectId(id)));
  
  return productById;
};
 
const create = async (name, quantity) => {
  const newProduct = await connection()
    .then(db => db.collection('products')
      .insertOne({ name, quantity }));
    
  const { insertedId } = newProduct;

  return { 
    _id: insertedId,
    name,
    quantity
  };
};

const update = async (id, name, quantity) => {
  const productUpdated = await connection()
    .then(db => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return {
    id,
    name,
    quantity
  };
};

const remove = async (id) => {
  const productDeleted = await connection()
    .then(db => db.collection('products')
      .deleteOne({ _id: ObjectId(id) }));

  return productDeleted;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove
};
