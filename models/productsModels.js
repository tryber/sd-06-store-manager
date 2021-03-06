const connection = require('./connection');
const { ObjectId } = require('mongodb');

// FIND ALL PRODUCTS
const getAllProducts = async () => {
  const getProducts = { 
    products: await connection()
      .then(mongodb => mongodb.collection('products').find().toArray())};
  return getProducts;
};

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

// UPDATE PRODUCT UNIT
const updateUnitProduct = async (id, name, quantity) => {
  const result = await connection().
    then(mongodb => mongodb.collection('products')
      .updateOne({_id: ObjectId(id)}, {$set: {name, quantity}}));

  let _id = id; 

  if(result) return { _id, name, quantity };

  return { message: 'Nothing... 404' };
};

// DELETE PRODUCT UNIT
const deleteUnitProduct = async (id) => {
  const result = await connection().
    then(mongodb => mongodb.collection('products').findOneAndDelete(
      {_id: ObjectId(id)},
      {returnOriginal:false}
    ));

  return result.value;
};

// UPDATE SERVER 
const updateServer = async (id, value) => {
  await connection().then(db => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $inc: { quantity: value } },      
  ));
};

// EXPORT MODELS FUNCTIONS 
module.exports = {
  create,
  updateServer,
  updateUnitProduct,
  deleteUnitProduct,
  findById,
  findByName,
  getAllProducts,
};