const { status, errorMessages } = require('../utilsData/dataResponses');
const { SalesHandlingDB } = require('../models');

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
  if(getData) return res.status(status.OK).json(getData);
  return res.status(status.not_found).json(errorMessages.salesNot_id);
};

module.exports = { create, getAll, getForId };