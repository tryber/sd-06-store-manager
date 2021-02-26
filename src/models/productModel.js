const connection = require('./connection');

/**
 *acrescenta um produto com id, nome e quantidade na tabela de produtos
 * @param {*} Object produto contendo name e quantity
 */
const createProduct = async (product) => {
  const { name, quantity } = product;
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne(name, quantity))
    .catch((err) => {
      console.log(err);
      throw new error(err);
    });
  return {
    _id: insertedId,
    name,
    quantity
  };
};

module.exports = {
  createProduct,
};
