const { ObjectId } = require('mongodb');
const connection = require('./connection');


const addSales = async (newSales) => {
  const sale =  await connection()
    .then((db) => db
      .collection('sales')
      .insertOne({ 
        itensSold: newSales
      })
    );
  
  const { insertedId } = sale;
  
  return {
    _id: insertedId,
    itensSold: newSales,
  };
};


const allSales = () => connection()
  .then((db) => db.collection('sales')
    .find().toArray() 
  );

const salesById = async (id) => connection()
  .then((db) => db.collection('sales')
    .findOne(ObjectId(id))
  );
  
const updateSales = (id, newSales) =>
  connection().then((db) => db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: newSales }}));

module.exports = { addSales, allSales, salesById, updateSales };