const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return { sales: allSales};
};

const getById = async (id) =>{
  const prod = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return prod;
};

const create = async (arr) => {
  const { insertedId } = await connection()
    .then((db) => 
      db.collection('sales').insertOne({ itemsSold: arr }));
  return {
    _id: insertedId,
    itensSold: arr
  };
};

// const update = async (name, quantity, id) => {
//   await connection()
//     .then((db) => db.collection('sales').updateOne(
//       { _id: ObjectId(id) }, { $set: {name, quantity} }
//     ));
//   return {
//     _id: id,
//     name: name,
//     quantity: quantity
//   };
// };

// const remove = async (id) => {
//   const currId = getById(id);
//   await connection()
//     .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

//   return currId;
// };

// const verifyName = async (name) => {
//   const verify = await connection()
//     .then(db => db.collection('sales').findOne({ name: name }));
//   if (verify) return true;
//   return false;
// };

module.exports = {
  getAll,
  getById,
  create,
  // verifyName,
  // update,
  // remove
};