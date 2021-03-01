const { ObjectId } = require('mongodb');
const connection = require('./connection');


const addSale = async (newSale) => {
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

// const saleById = async (id) => connection()
//   .then((db) => db.collection('sales')
//     .findOne(ObjectId(id))
//   );
  
// const updateSale = async (id, name, quantity) => connection()
//   .then((db) => db.collection('sales')
//     .updateOne({ _id: ObjectId(id) },
//       { $set: { name, quantity } }
//     ));

// const deleteSale = async (id) => connection()
//   .then((db) => db
//     .collection('sales')
//     .deleteOne({ _id: ObjectId(id) })
//   );

module.exports = { addSale, allSales, saleById, updateSale, deleteSale };