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

module.exports = {
  registerSale,
};
