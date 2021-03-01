const connection = require('./connection');
const { ObjectId } = require('mongodb');

/**
 *acrescenta um produto com id, nome e quantidade na tabela de produtos
 * @param {*} Object produto contendo name e quantity
 * @returns Objeto contendo id, nome e quantidade
 */
const createProduct = async (product) => {
  const { name, quantity } = product;
  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .catch((err) => {
      console.log(err);
      throw new error(err);
    });
  return result.ops[0];
};

/**
 * retorna lista de todos os produtos
 * @param {*} null -> sem parametros.
 */
const getAllProduct = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

/**
 * pesquisa produto pelo id
  * @param {*} String Código do produto
 */
const getFindById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  return result;
};

/**
 * pesquisa produto pelo nome
 * @param {*} String Nome do produto
 */
const getFindByName = async (name) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne(name));
  return result;
};

/**
 * Atualiza cadastro de produto
 * @param {*} Object objeto contendo Id, nome e quantidade do produto a ser alterado
 */
const updateProduct = async (product) => {
  const { _id, name, quantity } = product;
  const result = await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(_id) },
      { $set: { name, quantity } },
      { returnOriginal: false }
    ));
  return result;
};

/**
 * Remove produto do cadastro 
 * @param {*} String Id do produto a ser removido
 */
const removeProduct = async (id) => {
  if (!ObjectId.isValid) return null;
  const result = connection
    .then((db) => db.collection('products')
      .fidOneAndDelete({ _id: ObjectId(id) }));
  return result['value'];
};

module.exports = {
  createProduct,
  getAllProduct,
  getFindById,
  getFindByName,
  updateProduct,
  removeProduct
};
