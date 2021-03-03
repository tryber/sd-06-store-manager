const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

// const findProductId = async (id) => {
//   const { itensSold } = await connection()
//     .then((db) => db.collection('sales').findOne({ 'itensSold.productId': id }));
  
//   const product = itensSold.filter((sale) => sale.productId === id);
  
//   return product[0];
// };

const update = async (productId, quantity, id) => {
  await connection()
    .then((db) => db.collection('sales')
      .updateMany({ '_id': ObjectId(id) }, 
        { $set: { 
          'itensSold.$[].productId': productId,
          'itensSold.$[].quantity': quantity 
        } }));
  
  return await findById(id);
};

const create = async (products) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: products }));
  
  return {
    _id: insertedId,
    itensSold: products,
  };
};

const remove = async (id) => {
  const sale = findById(id);
  
  await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
    
  return sale;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
};
