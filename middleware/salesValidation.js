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

  products.map(async element => {

    if ( element.productId.length !== magicNumbers.idformat ) { 
      return res.status(notFormated).json(invalidId);
    }
    const resultValidatedId = await findById(ObjectId(element.productId));

    if( resultValidatedId === null) return res.status(notFormated).json(invalidId);
    
    if(element.quantity < magicNumbers.zero ||
       element.quantity === magicNumbers.zero ||
        typeof element.quantity === 'string') {
      return res.status(notFormated).json(InvalidQuantity);
    };
    
  });
  
  next(); 
};



module.exports = {
  salesValited
};