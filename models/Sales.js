const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const sales = await connection()
    .then(db => db.collection('sales').find().toArray());
  
  return { sales: sales };
};

const getById = async (id) => {
  return await connection().then(db => db.collection('sales').findOne(ObjectId(id)));
};

const create = async (arraySales) => {
  // console.log(productId,quantity );
  const { insertedId } = await connection().then(db => db.collection('sales')
    .insertOne({ 'itensSold': arraySales}));

  return {
    _id: insertedId,
    'itensSold': arraySales
  };
};

const update = async (id, productId, quantity) => {
  await connection().then(db => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: {
      'itensSold.$[elemento].quantity': quantity
    },
    },
    { arrayFilters: [ { 'elemento.productId': productId }]}
  ));

  return {
    _id: id,
    'itensSold': [{
      productId,
      quantity
    }]
  };
};

const remove = async (id) => {
  const  { itensSold } = await connection().then(db => db.collection('sales')
    .findOne({ _id: ObjectId(id)}));
  // console.log(itensSold);
  
  await connection().then(db => db.collection('sales')
    .deleteOne({ _id: ObjectId(id)}));

  return {
    _id: id,
    itensSold,
    
  };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};

// const update = async (id, productId, quantity) => {
//   await connection().then(db => db.collection('sales').updateOne(
//     { _id: ObjectId(id) , 'itensSold.$[]'},
//     { $set:{ 'itensSold': { quantity: quantity }} }
//   ));

//   return {
//     _id: id,
//     'itensSold': {
//       productId,
//       quantity
//     }
//   };
// };