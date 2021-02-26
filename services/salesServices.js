const { status, errorMessages } = require('../utilsData/dataResponses');
const { SalesHandlingDB } = require('../models');
const { salesValidation } = require('../services');

const create = async (req, res)=> {
  const listAdd = req.body;
  const resultCreate = await SalesHandlingDB.create(listAdd);
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
  const deleteSaleDB = await SalesHandlingDB.deleteSale(id); 
  return res.status(status.OK).json(deleteSaleDB);  
};

module.exports = { create, getAll, getForId, update, deleteSale };