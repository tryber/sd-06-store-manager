const { status, Messages } = require('../util/dataStatus');
const { notFormated } = status;
const { InvalidQuantity } = Messages;

const BodyValidated = async (req, res, next) => {
  const bodySale = req.body;
  
  magicNumbers = {
    zero: 0,
  };

  const result = bodySale.some(body => {
    if(body.quantity < magicNumbers.zero ||
      body.quantity === magicNumbers.zero) return true;
    if(typeof body.quantity === 'string') return true;
  });
  
  if(result) return res.status(notFormated).json(InvalidQuantity);
  
  next();
};

module.exports = {
  BodyValidated
};