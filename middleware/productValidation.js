const productsModels = require('../models/productsModels');
const { status, Messages } = require('../util/dataStatus');

const { notFormated } = status;
const { invalidName, largerZero, invalidQtt } = Messages;

const productValidated = async (req, res, next) => {
  const { name, quantity } = req.body;

  magicNumbers = {
    five: 5,
    zero: 0,
  };

  if (name.length < magicNumbers.five) return res.status(notFormated).json(invalidName);
  if (quantity < magicNumbers.zero || quantity === magicNumbers.zero) {
    return res.status(notFormated).json(largerZero);
  }
  if (typeof quantity === 'string') return res.status(notFormated).json(invalidQtt);

  next();
};



module.exports = {
  productValidated
};