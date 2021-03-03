const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const findByName = async (productName) => {
  const result = await connection()
    .then((db) => db.collection('products')
      .findOne({ name: productName }));
  
  return result;
};

const updateQuantity = async (id, num, operation) => {
  
  if (operation === '-') {
    await connection()
      .then((db) => db.collection('products')
        .updateOne({ '_id': ObjectId(id) }, 
          { $inc: { quantity: - num } })); 
  }else if (operation === '+') {
    await connection()
      .then((db) => db.collection('products')
        .updateOne({ '_id': ObjectId(id) }, 
          { $inc: { quantity: num } })); 
  }
};

const create = async (name, quantity) => {
  const alreadyExists = await findByName(name);
  if (alreadyExists) return false;
  
  const {insertedId} = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
    
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const update = async (name, quantity, id) => {
  const exists = await findById(id);
  
  await connection()
    .then((db) => db.collection('products')
      .updateOne({_id: ObjectId(id)}, {$set: {
        name,
        quantity,
      }}));
      
  return {
    _id: id,
    name,
    quantity,
  };
};

const remove = async (id) => {
  const exists = await findById(id);
  
  if (!exists) return false;
  
  await connection()
    .then((db) => db.collection('products')
      .deleteOne({_id: ObjectId(id)}));
      
  return {
    _id: id,
    name: exists.name,
    quantity: exists.quantity
  };
};

module.exports = {
  getAll,
  create,
  findByName,
  findById,
  update,
  remove,
  updateQuantity,
};
