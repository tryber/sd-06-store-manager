const connection = require('./connection');
const { ObjectId } = require('mongodb');

const deuRuin = 404;

/**
 * funcao que atualiza o estoque no cadastro de produtos
 * @param {*} Nunber Valor a ser atualizado
 * @returns estoque atualizado
 */
const atualizaCadastro = async (quantity, produto) => {
  const { result } = await (connection().then((db) => db.collection('products')
    .updateOne({
      _id: ObjectId(produto)
    },
    {
      $set: { quantity }
    })
  ));
};

/**
 * Criando uma venda e incluindo itens
 * @param (*) Object Objeto contendo o id do(s) produto(s) e quantidade(s) vendida(s)
 * @returns id da venda e produtos incluso
 */
const createSale = async (itensSold) => {

  itensSold.map( async (item) => {

    const estoqueAtual = await (connection().then((db) => db.collection('products')
      .findOne({ _id: ObjectId(item.productId) })));

    const quantity = estoqueAtual.quantity - item.quantity;

    const test = await atualizaCadastro(quantity, item.productId);

  });

  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
  return result.ops;
};

/**
 * Listando todas as vendas
 */
const findAllSales = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return result;
};

/**
 * 
 * @param {*} Object contendo o id e quantidade a ser atualizaxa 
 * @returns 
 */
const updateSale = async (id, products) => {
  return await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: products } }
    ));
};


/**
 * Remove venda
 * @param {*} id 
 * @returns 
 */
const removeSale = async (id) => {

  const vendas = await connection().then((db) => db
    .collection('sales').findOne({ _id: ObjectId(id) }));
  
  console.log(vendas);

  vendas.itensSold.map(async (item) => {

    const estoqueAtual = await (connection().then((db) => db.collection('products')
      .findOne({ _id: ObjectId(item.productId) })));

    const quantity = estoqueAtual.quantity + item.quantity;

    const teste2 = await atualizaCadastro(quantity, item.productId);

  });
 
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
  updateSale,
  removeSale
};
