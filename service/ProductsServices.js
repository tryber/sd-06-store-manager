// a estrutura básica do CRUD já montada, lidar com as
// regras/demandas dos requisitos
const Products = require('../models/Products');

// No Majik NUMBERS
const NAME_MIN_LENGTH = 5;
const NO_QUANTITY = 0;
const ID_24_HEX = 24;

// No Majik Status NUMBERS:
const UNPROCESSABLE_ENTITY =  422;
const SUCCESS_CREATED = 201;
const SUCCESS = 200;

// req 1
const creatingValidProduct = async(request, response) => {
  const { name, quantity } = request.body;

  if (name.length < NAME_MIN_LENGTH) {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err:
      {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    });
  }

  if ( quantity <= NO_QUANTITY) {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err:
      {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
    });
  }

  if (typeof quantity !== 'number') {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err:
      {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    });
  }

  const isReplicant = await Products.findByName(name);
  if (isReplicant) {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err:
      {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    });
  }

  // para receber o ID gerado automaticamente pelo cadastro desse produto
  const { insertedId } = await Products.createProduct(name, quantity);

  // para organizar o novo produto de forma a retorná-lo estruturado no .send();
  const freshProduct = { _id: insertedId, name, quantity };

  return response.status(SUCCESS_CREATED).send(freshProduct);
};

// req2
const displayingAllProducts = async (_request, response) => {
  const allProductsList = await Products.getAllProducts();
  console.log('all products List:', allProductsList);
  return response.status(SUCCESS).send({products: allProductsList});
};

const displayThisSpecificProduct = async (request, response) => {
  const { id } = request.params;

  if (id.length !== ID_24_HEX ) return response.status(UNPROCESSABLE_ENTITY)
    .json({err:
      {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });

  const thisProductOnly = await Products.getProductById(id);
  if(thisProductOnly === null || thisProductOnly === {})
    return response.status(UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        }
      });

  return response.status(SUCCESS).send(thisProductOnly);
};

module.exports = {
  creatingValidProduct,
  displayingAllProducts,
  displayThisSpecificProduct,
};
