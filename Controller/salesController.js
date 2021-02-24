const salesConnection = require('../Model/salesConnection');
const { getById } = require('../Model/productsConnection');
const { ObjectId } = require('mongodb');
/* const { ObjectId } = require('mongodb'); */

const codeErr = 422;
const created = 201;
const OK = 200;
const nameLength = 5;
const ZERO = 0;
const qntMessage = {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity'
};

const create = async (req, res) => {
  const {productId, quantity} = req.body;

  const quantities = quantity.array.forEach(element => {
    
  });

  if(quantity <= ZERO) {
    return res.status(codeErr).json({ err: qntMessage});
  }
  if(typeof quantity !== 'number') {
    return res.status(codeErr).json({ err: qntMessage});
  }

  const verifyId = await getById(productId);
  const getproductId = verifyId._id;

  if(ObjectId.isValid(getproductId) !== true) {
    return res.status(codeErr).json({ err: qntMessage});
  }
  if (!verifyId) {
    return res.status(codeErr).json({ err: qntMessage});
  }
  const create = await salesConnection.create(productId, quantity);
  res.status(OK).json({
    _id: create.insertedId,
    itensSold: [{productId, quantity}]
  });
  
};

module.exports = {
  create,
};
