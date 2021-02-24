const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  const produtoCriado = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => ({ _id: result.insertedId, name, quantity }));
  return produtoCriado;
};

const getAllProducts = async () => await connection()
  .then((db) => db.collection('products').find().toArray());

const findByIdProducts = async (id) => {
  const productData = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  if (!productData) return null;
  const { name, quantity } = productData;
  return { _id: id, name, quantity };
};

const updateProduct = (id, name, quantity) => 
  connection().then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: {  name, quantity } }
  )
  );

// const repeatFind = async (name) => {
//   const repeated = await connection()
//     .then((db) => db.collection('products').find({name: name}));
//   return false;
// };

module.exports = {
  createProduct,
  // repeatFind,
  getAllProducts,
  findByIdProducts,
  updateProduct
};
