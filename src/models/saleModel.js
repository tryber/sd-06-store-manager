const connection = require('./connection');

const createSaleModels = async (itensSold) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold })
      .then((item) => ({ _id: item.insertedId, itensSold }))
    );
};

module.exports = {
  createSaleModels,
};
