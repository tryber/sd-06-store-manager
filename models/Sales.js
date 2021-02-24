const connection = require('./connection');

const create = async (arraySales) => {
  // console.log(productId,quantity );
  const { insertedId } = await connection().then(db => db.collection('sales')
    .insertOne({ 'itensSold': arraySales}));

  return {
    _id: insertedId,
    'itensSold': arraySales
  };
};

module.exports = {
  create
};