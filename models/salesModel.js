const { ObjectId } = require('mongodb');
const connection = require('./connection');


const addSales = async (newSale) => {
  const sale =  await connection()
    .then((db) => db
      .collection('sales')
      .insertOne({ 
        itensSold: newSale 
      })
    );
  
  const { insertedId } = sale;
  
  return {
    _id: insertedId,
    itensSold: newSale,
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
  
const updateSales = async (id, name, quantity) => connection()
  .then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) },
      { $set: { name, quantity } }
    ));

const deleteSales = async (id) => connection()
  .then((db) => db
    .collection('sales')
    .deleteOne({ _id: ObjectId(id) })
  );

module.exports = { addSales, allSales, salesById, updateSales, deleteSales };