const connection = require('./connection');

const getSales = async () => 
  await connection()
    .then((db) => db.collection('sales') 
      .find().toArray());

const addSales = async (sales) =>  
  await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold: sales }));

const findSalesById = async (id) => 
  await connection()
    .then((db) => db.collection('sales') 
      .findOne(ObjectId(id)));

const salesUpdated = async (id, itensSold) => 
  await connection()
    .then((db) => db.collection('sales') 
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold } }
      ));

module.exports = {
  getSales,
  addSales,
  findSalesById,
  salesUpdated,
};
