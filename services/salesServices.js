const { status, errorMessages } = require('../utilsData/dataResponses');
const { SalesHandlingDB, productsHandlingDB } = require('../models');

const upQuantity = async(validator, list) => {
  let quantity;
  const oneNegative = -1;
  await list.forEach( async product => {
    if(validator === 'subt')
      quantity = product.quantity * oneNegative;
    else  quantity = product.quantity;
    await  productsHandlingDB.updateQuantity(product.productId, quantity);
  });
};

const verifyQuantity = async (list) => {
  const selectProduct = await productsHandlingDB.findById(list[0].productId);
  const verify = await list.some(product => {
    const resultQuantity = Number(selectProduct.quantity)-product.quantity;
    const valueZero = 0;    
    if(resultQuantity < valueZero) return true;    
  });
  return verify;
};

const create = async (req, res)=> {
  const listAdd = req.body;
  const validator = 'subt';
  const verifyQtt = await verifyQuantity(listAdd);
  console.log(verifyQtt);
  if(verifyQtt) return res.status(status.not_found).json(errorMessages.qtt_smaller);
  const resultCreate = await SalesHandlingDB.create(listAdd);
  await upQuantity(validator,listAdd);
  return res.status(status.OK).json( resultCreate );
};

const getAll = async (_req,res) => {
  const getList = await SalesHandlingDB.getAll();
  return res.status(status.OK).json( getList );
};

const getForId = async (req,res) => {
  const { id } = req.params;
  const getData = await SalesHandlingDB.getForId(id);
  return res.status(status.OK).json(getData);
};

const update = async (req, res) => {
  const { id } = req.params;
  const listAdd = req.body;
  const upResult = await SalesHandlingDB.update(id,listAdd);
  return res.status(status.OK).json(upResult);
};

const deleteSale = async (req,res) => {
  const { id } = req.params;
  const validator = 'sum';
  const deleteSaleDB = await SalesHandlingDB.deleteSale(id);
  await upQuantity(validator,deleteSaleDB.itensSold);
  return res.status(status.OK).json(deleteSaleDB);
};

module.exports = { create, getAll, getForId, update, deleteSale };
