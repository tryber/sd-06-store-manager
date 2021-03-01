// a estrutura básica do CRUD já montada, lidar com as
// regras/demandas dos requisitos
const Products = require('../models/Products');

// No Majik NUMBERS
const NAME_MIN_LENGTH = 5;
const NO_QUANTITY = 0;
const ID_24_HEX = 24;

// No Majik Status NUMBERS:
const UNPROCESSABLE_E =  422;
const SUCCESS_CREATED = 201;
const SUCCESS = 200;


const isLengthLessThan = (value, number) => (value.length < number);
const isQuantityZero = (value, number) => ( value <= number);
const isQuantityNumber = (value, typeOfValue) => (typeof value !== typeOfValue);
const code = 'invalid_data';
const errorMessages = {
  nameLength:'"name" length must be at least 5 characters long',
  plusEual1:'"quantity" must be larger than or equal to 1',
  mustBeNumber: '"quantity" must be a number',
  replicantProd: 'Product already exists',
  idFormat:'Wrong id format' ,
};

// req 1
const creatingValidProduct = async(request, response) => {
  const { name, quantity } = request.body;

  switch(true) {

  case (isLengthLessThan(name, NAME_MIN_LENGTH)):
    return response.status(UNPROCESSABLE_E)
      .json({ err: { code, message: errorMessages.nameLength }});

  case (isQuantityZero(quantity, NO_QUANTITY)):
    return response.status(UNPROCESSABLE_E)
      .json({ err:{ code, message: errorMessages.plusEual1}});

  case (isQuantityNumber(quantity, 'number')):
    return response.status(UNPROCESSABLE_E)
      .json({ err: { code, message: errorMessages.mustBeNumber }});

  }
  const isReplicant = await Products.findByName(name);
  if (isReplicant) { return response.status(UNPROCESSABLE_E)
    .json({ err: { code, message: errorMessages.replicantProd }});
  }
  // para receber o ID gerado automaticamente pelo cadastro desse produto
  const { insertedId } = await Products.createProduct(name, quantity);

  // para organizar o novo produto de forma a retorná-lo estruturado no .send();
  const freshProduct = { _id: insertedId, name, quantity };

  return response.status(SUCCESS_CREATED).send(freshProduct);
};

const displayingAllProducts = async (_request, response) => {
  const allProductsList = await Products.getAllProducts();

  return response.status(SUCCESS).send({products: allProductsList});
};

const displayThisSpecificProduct = async (request, response) => {
  const { id } = request.params;

  if (id.length !== ID_24_HEX ) return response.status(UNPROCESSABLE_E)
    .json({err: { code, message: errorMessages.idFormat }});

  const thisProductOnly = await Products.getProductById(id);
  if(thisProductOnly === null || thisProductOnly === {})
    return response.status(UNPROCESSABLE_E)
      .json({err: { code, message: errorMessages.idFormat } });

  return response.status(SUCCESS).send(thisProductOnly);
};

// req 3
const updatingValidProduct = async (request, response) => {
  const { id } = request.params;
  const { name, quantity} = request.body;

  if (isLengthLessThan(name, NAME_MIN_LENGTH)) {
    return response.status(UNPROCESSABLE_E)
      .json({ err: { code, message: errorMessages.nameLength }});
  };

  if (isQuantityZero(quantity, NO_QUANTITY)) {
    return response.status(UNPROCESSABLE_E)
      .json({ err: { code, message: errorMessages.plusEual1 }});
  };

  if (isQuantityNumber(quantity, 'number')) {
    return response.status(UNPROCESSABLE_E)
      .json({ err: { code, message: errorMessages.mustBeNumber }});
  };


  await Products.updateProduct(id, name, quantity);;

  const updatedProduct = {_id: id, name, quantity };

  return response.status(SUCCESS).send(updatedProduct);
};


// req 4
const removingValidProduct = async (request, response) => {
  const { id } = request.params;

  if (id.length !== ID_24_HEX ) return response.status(UNPROCESSABLE_E)
    .json({err: { code, message: errorMessages.idFormat } });

  const thisProductOnly = await Products.getProductById(id);
  if(thisProductOnly === null || thisProductOnly === {})
    return response.status(UNPROCESSABLE_E)
      .json({err: { code, message: errorMessages.idFormat } });

  await Products.deleteProduct(id);
  return response.status(SUCCESS).send(thisProductOnly);
};

module.exports = {
  creatingValidProduct,
  displayingAllProducts,
  displayThisSpecificProduct,
  updatingValidProduct,
  removingValidProduct
};
