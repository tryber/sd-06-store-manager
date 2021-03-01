const productsModels = require('../models/productsModels');
const { status, Messages } = require('../util/dataStatus');

const { notFormated } = status;
const { invalidId } = Messages;

const idValidate = async (req, res, next) => {
  const { id } = req.params;
  
  magicNumbers = {
    idCorrect: 24,
  };

  if (id.length !== magicNumbers.idCorrect) {
    return res.status(notFormated).json(invalidId);
  }

  next();
};



module.exports = {
  idValidate
};