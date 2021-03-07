const connection = require('./connection');
const ObjectId = require('mongodb');

/**
 * Criando uma venda e incluindo itens
 * @param (*) Object Objeto contendo o id do(s) produto(s) e quantidade(s) vendida(s)
 * @returns id da venda e produtos incluso
 */
const createSale = async (itensSold) => {
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
  console.log(result);
  return result.ops;
};

/**
 * Listando todas as vendas
 */
const findAllSales = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const findSaleById = async (id) => {
  return await connection().then((db) => db
    .collection('sales')
    .findOne({ _id: ObjectId(id) })
  );
};

const removeSale = async (id) => {
  return await connection().then(db => db
    .collection('sales')
    .deleteOne(
      { _id: ObjectId(id) }
    ));
};

module.exports = {
  createSale,
  findAllSales,
  findSaleById,
  removeSale
};
