const { status, Messages } = require('../util/dataStatus');
const { not_found, notFormated } = status;
const { salesNotFound, invalidData } = Messages;

const { getSaleUnit } = require('../models/salesModels');

const idSalesValidate = async (req, res, next) => {
  const { id } = req.params;
  
  magicNumbers = {
    idCorrect: 24,
  };

  if (id.length !== magicNumbers.idCorrect) {
    return res.status(not_found).json(salesNotFound);
  }

  next();
};

const idValid = async (req,res, next) => {
  const { id } = req.params;

  magicNumbers = {
    idCorrect: 24,
  };

  if(id.length !== magicNumbers.idCorrect) {
    return res.status(notFormated).json(invalidData);
  }

  const result = await getSaleUnit(id);

  if(!result) {
    return res.status(not_found).json(salesNotFound);
  }

  next();
};
  

module.exports = {
  idSalesValidate,
  idValid
};