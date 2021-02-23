const { Router } = require('express');
const ProductService = require('../services/ProductsService');

const ProductsControllerRouter = Router();
const SC_OK = 200;
const CREATED = 201;
const SC_NO_CONTENT = 204;
const SC_NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const NAME_MIN_LENGHT = 5;
const ZERO = 0;

const validate = async (req, res) => {
 
  const { name, quantity } = req.body;
  let message;
  let code;
  let status_code;
  let object_answer;

  if (!name) {
    message = 'nome não existe';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }
  if (typeof name !== 'string') {
    message = 'nome não é string';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }
  if (name.length < NAME_MIN_LENGHT) {
    message = '"name" length must be at least 5 characters long';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }

  if (!quantity) {
    message = 'quantity não existe';
    code = 'invalid_data';
    status_code = SC_NOT_FOUND;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }
  if (typeof quantity === 'string') {
    message = 'quantity must be a number';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }
  if (quantity <= ZERO) {
    message = '"quantity" must be larger than or equal to 1';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }
  return true;
};

ProductsControllerRouter.get('/', async (_req, res) => {
  const products = await ProductService.getAll();
  res.status(SC_OK).json(products);
});

ProductsControllerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const products = await ProductService.findById(id);

  if (!products) return res.status(SC_NOT_FOUND).json({message: 'products not found'});

  res.status(SC_OK).json(products);
});

ProductsControllerRouter.post('/', async (req, res) => {
  const isValid = await validate(req,res);
  if (isValid) {
    const { name, quantity } = req.body;
    const products = await ProductService.create(name, quantity);
    res.status(CREATED).json(products);
  }
});

ProductsControllerRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await ProductService.update(id, name, quantity);

  res.status(SC_NO_CONTENT).end();
});

ProductsControllerRouter.delete('/:id', async(req, res) => {
  const { id } = req.params;

  await ProductService.remove(id);

  res.status(SC_NO_CONTENT).end();
});

module.exports = ProductsControllerRouter;
