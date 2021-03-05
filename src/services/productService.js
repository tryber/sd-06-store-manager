const products = require('../models/productModel');

// No Magic Numbers and Status Numbers
const NAME_MIN_LENGTH = 5;
const NULL_QUANTITY = 0;
const ID_MONGO_LENGTH = 24;

const SUCCESS = 200;
const SUCCESS_CREATED = 201;
const UNPROCESSABLE_ENITY = 422;

const code = 'invalid_data';

// Functions
const theLengthLessThan = (value, number) => (value.length < number);
const isBiggerThan = (value, number) => ( value <= number);
const isTypeIs = (value, typeOfValue) => (typeof value !== typeOfValue);

// Error Messages
const errorMessages = {
  nameGreaterThanFive: '"name" length must be at least 5 characters long',
  biggerOrEqualOne: '"quantity" must be larger than or equal to 1',
  mustBeNumber: '"quantity" must be a number',
  existingProduct: 'Product already exists',
  idFormat:'Wrong id format',
};

// Criação do produto + validação
const createProductService = async (req, res) => {
  const { name, quantity } = req.body;

  switch(true) {
  case (theLengthLessThan(name, NAME_MIN_LENGTH)):
    return res.status(UNPROCESSABLE_ENITY)
      .json({ err: { code, message: errorMessages.nameGreaterThanFive }});

  case (isBiggerThan(quantity, NULL_QUANTITY)):
    return res.status(UNPROCESSABLE_ENITY)
      .json({ err:{ code, message: errorMessages.biggerOrEqualOne }});

  case (isTypeIs(quantity, 'number')):
    return res.status(UNPROCESSABLE_ENITY)
      .json({ err: { code, message: errorMessages.mustBeNumber }});
  }
  const isDuplicate = await products.findProductByNameModels(name);

  if (isDuplicate) { 
    return res.status(UNPROCESSABLE_ENITY)
      .json({ err: { code, message: errorMessages.existingProduct }});
  }

  // Gerar ID 
  const { insertedId } = await products.createProductModels(name, quantity);

  return res.status(SUCCESS_CREATED).send({ _id: insertedId, name, quantity });
};

// Lista todos os produtos
const getAllProductsService = async (_req, res) => {
  const allProducts = await products.getAllProductModels();

  return res.status(SUCCESS).send({ products: allProducts });
};

// Lista produtos por ID
const getProductByIdService = async (req, res) => {
  const { id } = req.params;

  if (id.length !== ID_MONGO_LENGTH ) {
    return res.status(UNPROCESSABLE_ENITY)
      .json({ err: { code, message: errorMessages.idFormat }});
  };

  const onlyOneProduct = await products.getProductByIdModels(id);

  if(onlyOneProduct === null || onlyOneProduct === {}) { 
    return res.status(UNPROCESSABLE_ENITY)
      .json({ err: { code, message: errorMessages.idFormat } });
  };

  return res.status(SUCCESS).send(onlyOneProduct);
};

module.exports = {
  createProductService,
  getAllProductsService,
  getProductByIdService,
};
