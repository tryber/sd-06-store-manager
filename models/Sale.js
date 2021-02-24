const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  // return await connection().then(db => db.collection('sales').find().toArray());
  const getAllItens = await connection()
    .then(db => db.collection('sales').find().toArray());
    // escrevendo 'sales' antes do retorno
  return {
    sales: getAllItens
  };
};

const create = async (itensSold) => {

  const retorno = await connection()
    .then(db => db.collection('sales').insertOne({ itensSold }));
  // const { insertedId } = await connection()
  //   .then(db => db.collection('sales').insertOne({ itensSold }));
  const { insertedId } = retorno;
  
  // return {
  //   _id: insertedId,
  //   itensSold: [{
  //     productId: itensSold[i].productId,
  //     quantity: itensSold[i].quantity,
  //   }]
  // };
  return retorno.ops[0];
 
};

const findById = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return await connection()
    .then(db => db.collection('sales').findOne(ObjectId(id)));

  // return {
  //   sales: getAllItens
  // };
};

const update = async (id, quantity) => {
  if(!ObjectId.isValid(id)) return null;
  //return
  const retorno = await connection().then(db => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { quantity } }
  ));
  
  // return {
  //   _id: ObjectId(id),
  //   id,
  //   quantity
  // };
  return retorno.ops[0];
};

const remove = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  const check = await findById(id);
  if (!check) {
    return null; //console.log('nao existe');
  }
  await connection().then(db => db.collection('sales').deleteOne(
    { _id: ObjectId(id) }
  ));
  return check;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
};