const productsConnection = require('../Model/productsConnection');

const codeErr = 422;
const created = 201;
const nameLength = 5;
const ZERO = 0;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  if (!quantity) {
    return res.status(codeErr)
      .json({ 'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1'
      } });
  }
  if (quantity <= ZERO ) {
    return res.status(codeErr)
      .json({ 'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1'
      } });
  } 
  if (typeof quantity !== 'number') {
    return res.status(codeErr)
      .json({ 'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be a number'
      } });
  }

  if (!name) {
    return res.status(codeErr)
      .json({ 'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      } });
  }
  if (typeof name !== 'string' ) {
    return res.status(codeErr)
      .json({ 'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      } });
  }
  if (name.length < nameLength) {
    return res.status(codeErr)
      .json({ 'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      } });
  }

  const checkName = await productsConnection.getByName(name);
  
  if (checkName) {
    return res.status(codeErr)
      .json({ 'err': {
        'code': 'invalid_data',
        'message': 'Product already exists'
      } });
  } else {
    const registerProduct = await productsConnection.create(name, quantity);
    return res.status(created).json({ _id: registerProduct.insertedId, name, quantity });
  }
};

module.exports = {
  create,
};
