const { status, errorMessages } = require('../utilsData/dataResponses');
const { SalesHandlingDB } = require('../models');

const validaQuantity = (req,res,next) => {
  const valueZero = 0;
  const listAdd = req.body;

  const verifyList = listAdd.some(body => {
    if(body.quantity < valueZero || body.quantity === valueZero) return true;
    if(typeof body.quantity === 'string') return true;
  });
  if(verifyList) return res.status(
    status.Unprocessable_Entity).json(errorMessages.qtt_invalid);

  next();
};

const idValid = async(req,res, next) => {
  const { id } = req.params;
  const correctLength = 24;
  if(id.length !== correctLength) return res.status(status.not_found)
    .json(errorMessages.salesNot_id);
  const findId = await SalesHandlingDB.getForId(id);
  if(!findId)  return res.status(status.not_found)
    .json(errorMessages.salesNot_id);
  next();
};

const idExist = async (req,res,next) => {
  const { id } = req.params;
  const correctLength = 24;
  if(id.length !== correctLength) return res.status(status.Unprocessable_Entity)
    .json(errorMessages.salesID_existis);
  const findId = await SalesHandlingDB.getForId(id);
  if(!findId) return res.status(status.not_found).json(errorMessages.salesID_existis);
  next();
};

module.exports = { validaQuantity, idValid, idExist };
