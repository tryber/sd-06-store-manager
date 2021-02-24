const { handlingDB } = require('../models');
const { errorMessages, status } = require('../utilsData/dataResponse'); 
const err = 422;
const minLength = 5;
const  valueZero = 0;

const validateBody = async (req, res, next) =>{
  const {name, quantity} = req.body;  

  if(name.length < minLength) return res.status(status['Unprocessable Entity'])
    .json(errorMessages.invalid_name);

  const findForName = await handlingDB.findByName(name);
  if(findForName !== null) return res.status(status['Unprocessable Entity'])
    .json(errorMessages.repeat_name);  

  if(quantity < valueZero || quantity === valueZero) return res.status(
    status['Unprocessable Entity']).json(errorMessages.larger_zero);

  if(typeof quantity === 'string') return res.status(
    status['Unprocessable Entity']).json(errorMessages.type_string);

  next();
};

const create = async (req, res,) => {
  const {name, quantity} = req.body;  
  const handle = await handlingDB.create(name,quantity);
  return res.status(status.created).json(handle);
};

module.exports = {create,validateBody};
