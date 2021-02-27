const connection = require('./connection');
const { ObjectId } = require('mongodb');

// const updateProduct = async (id, name, quantity) => {
//   return await connection()
//     .then(db => db.collection('products')
//       .updateOne( {_id: ObjectId(id) }, { $set: { name: name, quantity: quantity } }));
// };

// const deleteProduct = async (id) => {
//   const { value } = await connection()
//     .then(db => db.collection('products')
//       .findOneAndDelete({_id: ObjectId(id)}));
//   // console.log('model', value, 'modelllll');
//   return value;
// };

const createSales = async (itensSold) => {
  const { insertedId } = await connection()
    .then(db => db.collection('sales').insertOne({ itensSold }));

  return {
    _id: insertedId,
  };
};

const getAllSales = async () => {
  return await connection()
    .then(db => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  return await connection()
    .then(db => db.collection('sales').findOne(ObjectId(id)));
};

const deleteSale = async (id) => {
  const { value } =  await connection()
    .then(db => db.collection('sales').findOneAndDelete({_id: ObjectId(id)}));
  return value;
};

module.exports = {
  createSales,
  getAllSales,
  getById,
  deleteSale,
};
