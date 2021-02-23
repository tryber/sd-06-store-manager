const Products = require('../models/Products');

const STATUS422 = 422;
const NAMELENGTH = 5;
const ZERO = 0;

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  console.log(await Products.checkName(name));

  if ( name.length < NAMELENGTH ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': '\"name\" length must be at least 5 characters long'
  } });

  if ( await Products.checkName(name) ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': 'Product already exists'
  } });
  
  if ( quantity <= ZERO ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': '\"quantity\" must be larger than or equal to 1'
  } });

  if ( !Number(quantity) ) return res.status(STATUS422).json({ 'err': {
    'code': 'invalid_data',
    'message': '\"quantity\" must be a number'
  } });

  
  

  return next();
};

module.exports = {
  validateProduct
};

// if (validateName(name)) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

// if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
// if (validateAge(age)) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

// if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
// if (date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
// if (!validateDatePattern(date.datedAt)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });