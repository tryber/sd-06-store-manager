const { status, Messages } = require('../util/dataStatus');
const { not_found } = status;
const { salesNotFound } = Messages;

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

module.exports = {
  idSalesValidate
};