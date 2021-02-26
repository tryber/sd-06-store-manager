const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  await connection()
    .then(db => db.collection('sales').find().toArray());
};

const createSale =  async (element) => {
  const { insertedId } = await connection()
    .then(db => db.collection('sales').insertOne({
      intensSold: element
    }));

  return {
    _id: insertedId,
    itensSold: element,
  };
};

module.exports = {
  getAllSales,
  createSale
};
