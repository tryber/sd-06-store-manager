const connection = require('./connection');

const getAll = async () => {
  return connection().then((db) => db.collection('sales').find().toArray())
    .then((sales) =>
      sales.map(({ _id, productId, quantity }) => ([{
        _id,
        itensSold: [{
          productId,
          quantity,
        }]
      }]))
    );
};

const findById = async (id) => {
  const getId = connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectId(id)}));
  return getId;
};

const create = async (productId, quantity) => {
  const creation = connection()
    .then((db) => db.collection('sales').insertOne({productId, quantity}));
  return creation;
};

module.exports = {
  getAll,
  findById,
  create,
};
