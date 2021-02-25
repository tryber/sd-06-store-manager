const { errorMessages, status } = require('../utilsData/dataResponses');
const { productsHandlingDB } = require('../models');

const validateBody = async (req, res, next) =>{
  const {name, quantity} = req.body;
  const minLength = 5;
  const  valueZero = 0;

  if(name.length < minLength) return res.status(status.Unprocessable_Entity)
    .json(errorMessages.invalid_name);

  if(quantity < valueZero || quantity === valueZero) return res.status(
    status.Unprocessable_Entity).json(errorMessages.larger_zero);

  if(typeof quantity === 'string') return res.status(
    status.Unprocessable_Entity).json(errorMessages.type_string);

  const findForName = await  productsHandlingDB.findByName(name);
  if(findForName !== null) return res.status(status.Unprocessable_Entity)
    .json(errorMessages.repeat_name);

  next();
};

const idValid = (req,res, next) => {
  const { id } = req.params;
  const correctLength = 24;
  if(id.length !== correctLength) {
    return res.status(status.Unprocessable_Entity).json(errorMessages.not_id);
  }
  next();
};

module.exports={ validateBody, idValid };