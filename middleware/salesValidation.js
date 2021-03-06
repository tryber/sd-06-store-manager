const { status, Messages } = require('../util/dataStatus');
const {findById} = require('../models/productsModels');
const { ObjectId } = require('mongodb');

const { notFormated } = status;
const { InvalidQuantity, invalidId } = Messages;

const salesValited = async (req, res, next) => {
  const products = req.body;

  magicNumbers = {
    zero: 0,
    idformat: 24
  };
  // Testar Quantidade Negativa, Zero
  // Testar ID Valid

  const resultQuantity = products.some(body => {
    // console.log(body.quantity)
    if(body.quantity < magicNumbers.zero ||
      body.quantity === magicNumbers.zero) return true;

    if(typeof body.quantity === 'string') return true;
  });

  if(resultQuantity) return res.status( notFormated).json(InvalidQuantity);

  const resultProductId = products.some( body => {
    if(body.productId.length !== magicNumbers.idformat) return true;
  });

  if(resultProductId) return res.status(notFormated).json(invalidId);

  next(); 
};



module.exports = {
  salesValited
};