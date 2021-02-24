const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const getAllItens = await connection()
    .then(db => db.collection('sales').find().toArray());
  return {
    sales: getAllItens
  };
};

const create = async (itensSold) => {

  const retorno = await connection()
    .then(db => db.collection('sales').insertOne({ itensSold }));
  const { insertedId } = retorno;
  return retorno.ops[0];
 
};

const findById = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  return await connection()
    .then(db => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, body) => {
  console.log(body);
  if(!ObjectId.isValid(id)) return null;

  const updateSale = await connection().
    then(db => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: body } }
    ))
    .then(() => ({ _id: id, itensSold: body }));
  return updateSale;
  
};

const remove = async (id) => {
  console.log('oi',id);
  if(!ObjectId.isValid(id)) return null;
  return await connection().then(db => db.collection('sales').deleteOne(
    { _id: ObjectId(id) }
  ));
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
};