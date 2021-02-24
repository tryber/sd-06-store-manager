const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (productId, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne(itensSold[{productId, quantity}]));
  
  return {
    id: insertedId,
    itensSold: [
      {
        productId,
        quantity,
      }
    ],
  };
};

// const getAllProducts = async() => {
//   return { products: await connection()
//     .then((db) => db.collection('products').find().toArray())};
// };

// const findByIdProduct = async(id) => {
//   return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
// };

// const updateByIdProduct = async(id, name, quantity) => {
//   const { insertedId } = await connection()
//     .then((db) => db.collection('products')
//       .updateOne({_id: ObjectId},{ $set:{name, quantity}}));
//   return {
//     id: insertedId,
//     name,
//     quantity,
//   };
// };

// const deleteByIdProduct = async(id) => {
//   return await connection().then((db) => db.collection('products')
//     .deleteOne({_id: ObjectId}));
// };

// const findByName = async (name) => {
//   return await connection()
//     .then((db) => db.collection('products').findOne({ name }))
//     .catch(err => console.error(err));
// };

module.exports = {
  createSale,
  // getAllProducts,
  // findByIdProduct,
  // updateByIdProduct,
  // deleteByIdProduct,
  // findByName,
};
