const connection = require('../database');
const { ObjectId } = require('mongodb');

const createSale = async ({ name, quantity }) => {
  const newSale = await connection().then((db) =>
    db.collection('collection').insertOne({ name, quantity })
  );

  return newSale;
};

module.exports = {
  createSale,
};

