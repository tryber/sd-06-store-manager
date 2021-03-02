const rescue = require('express-rescue');
const {
  getAllProducts,
  addNewProduct,
  searchForProductName,
  searchForProductId,
  updateProduct,
  deleteProduct,
} = require('../models/productsModel');

const {
  nameIsValid,
  quantityIsNumber,
  quantityIsLessThanZero,
  quantityIsEqualToZero,
} = require('../Services/validations');

const SUCCESS = 200;
const ENTITY = 422;
const CREATED = 201;

const listAllProducts = rescue(async (_req, res, next) => {
  res.status(SUCCESS).json({ products: await getAllProducts()});
  next();
});

const listProductById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  if(!Object(id)) {
    return res.status(ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  return res.status(SUCCESS).json(await searchForProductId(id));
});

const deleteProductById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  if(!Object(id)) {
    return res.status(ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  const foundProduct = await searchForProductId(id);

  if(foundProduct === null) {
    return res.status(ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  await deleteProduct(id);
  return res.status(SUCCESS).json(foundProduct);
});

const getProductByName = rescue(async (req, res, next) => {
  const { name } = req.query;
  return res.status(SUCCESS).json(await getProductByName(name));
});

const addProduct = rescue(async (req, res, next) => {

  const { name, quantity } = req.body;

  const foundProducts = await searchForProductName(name);

  const productAlreadyExists = foundProducts.some(
    (ProductName) => ProductName === ProductName
  );

  if(!nameIsValid(name)) {
    return res.status(ENTITY).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long'
        }
      }
    );
  }

  if(!quantityIsNumber(quantity)) {
    return res.status(ENTITY).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be a number'
        }
      }
    );
  }

  if(quantityIsLessThanZero(quantity)) {
    return res.status(ENTITY).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be larger than or equal to 1'
        }
      }
    );
  }

  if(quantityIsEqualToZero(quantity)) {
    return res.status(ENTITY).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be larger than or equal to 1'
        }
      }
    );
  }

  if(productAlreadyExists) {
    return res.status(ENTITY).json(
      {
        err:
        {
          code: 'invalid_data',
          message: 'Product already exists'
        }
      }
    );
  }

  if(!productAlreadyExists) {
    await addNewProduct(name, quantity);
    res.status(CREATED).json(await searchForProductName(name));
  }
  next();
});

const updateProducts = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  if(!nameIsValid(name)) {
    return res.status(ENTITY).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long'
        }
      }
    );
  }

  if(quantityIsLessThanZero(quantity)) {
    return res.status(ENTITY).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be larger than or equal to 1'
        }
      }
    );
  }

  if(quantityIsEqualToZero(quantity)) {
    return res.status(ENTITY).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be larger than or equal to 1'
        }
      }
    );
  }

  if(!quantityIsNumber(quantity)) {
    return res.status(ENTITY).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be a number'
        }
      }
    );
  }

  await updateProduct(id, name, quantity);
  res.status(SUCCESS).json(await searchForProductId(id));

  next();
});

module.exports = {
  listAllProducts,
  listProductById,
  deleteProductById,
  getProductByName,
  addProduct,
  updateProducts,
};
