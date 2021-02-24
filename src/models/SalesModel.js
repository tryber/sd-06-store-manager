const connection = require('./connection');

const create = async (itens) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ 
      itensSold: itens
    }));
  return ({_id: insertedId, itensSold: itens });
};


module.exports = {
  create,
};