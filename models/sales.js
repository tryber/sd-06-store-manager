const connection = require('./connection');

const create = async (itensSold) => {
  const sales = {
    itensSold: []
  };

  itensSold.forEach(element => {
    sales.itensSold.push(element);
  });

  const salesDB = await connection()
    .then((db) => db.collection('sales').insertOne({ sales }));

  return {_id: salesDB.insertedId, itensSold: sales.itensSold }; 
};

module.exports = {
  create,
};
