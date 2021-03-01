const connection = require('./connection');

const registerSale = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold }));

  return {
    _id: insertedId,
    itensSold,
  };
};

const getSales = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return sales;
};

const getSaleById = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  return sale;
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
};
