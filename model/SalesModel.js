const connection = require('./connection');

const registerSale = async (productsSold) => {
  const create = await connection().then((db) => {
    db.collection('sales').insertMany(productsSold);
  });
  return create.insertedId;
};

module.exports = {
  registerSale
};
