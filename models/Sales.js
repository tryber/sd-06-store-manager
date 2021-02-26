const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales')
      .find().toArray());

  return {
    sales: allSales
  };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const saleById = await connection()
    .then((db) => db.collection('sales')
      .findOne(ObjectId(id)));
  
  return saleById;
};
 
const findByName = async (name) => {
  const sale = await connection()
    .then((db) => db.collection('sales')
      .findOne({name}));
  
  return sale;
};

const create = async (sale) => {
  const newSale = { itensSold: sale };
  const registeredSale = await connection()
    .then(db => db.collection('sales')
      .insertOne({ ...newSale}));

  return { 
    _id: registeredSale.insertedId,
    ...newSale
  };
};

const update = async (id, sale) => {
  if (!ObjectId.isValid(id)) return null;

  const { productId, quantity } = sale[0];

  const saleUpdated = await connection()
    .then(db => db.collection('sales')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { 'itensSold': [{ productId, quantity }] } },
        { returnOriginal: false }
      ));

  return saleUpdated['value'];
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const saleDeleted = await connection()
    .then(db => db.collection('sales')
      .findOneAndDelete({ _id: ObjectId(id) }));

  return saleDeleted['value'];
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  remove
};
