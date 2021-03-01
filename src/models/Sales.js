const connection = require('./connection');

const DB_COLECTION = 'sales';

const createNewSale = async (objectSales) => {
  const { insertedId } = await connection().then((db) =>
    db.collection(DB_COLECTION).insertOne({
      itensSold: objectSales }),
  );

  return {
    _id: insertedId,
    itensSold: objectSales,
  };
};

module.exports = {
  createNewSale,
};
