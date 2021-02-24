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
    message = 'Inform a value for "name"';
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
    message = '"name" is not a string';
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

  if (quantity === undefined) {
    message = '"quantity" do not exist';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(UNPROCESSABLE_ENTITY).json(object_answer);
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
  if (typeof quantity === 'string') {
    message = '"quantity" must be a number';
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
  const alreadyExists = await ProductService.findByName(name);
  if (alreadyExists) {
    message = 'Product already exists';
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
  
  if (!products ) {
    const errorMessage = {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
    return res.status(UNPROCESSABLE_ENTITY).json({err: errorMessage});
  }

  res.status(SC_OK).json(products);
});

ProductsControllerRouter.post('/', async (req, res) => {
  const isValid = await validate(req,res);
  if (isValid) {
    const { name, quantity } = req.body;
    const products = await ProductService.create(name, quantity);
    // console.log(products);
    res.status(CREATED).json(products);
  }
});

ProductsControllerRouter.put('/:id', async (req, res) => {
  const isValid = await validate(req,res);
  if (isValid) {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const products = await ProductService.update(id, name, quantity);

    res.status(SC_OK).json(products);
  }
});

ProductsControllerRouter.delete('/:id', async(req, res) => {
  
  const { id } = req.params;

  const products = await ProductService.remove(id);

  if (!products ) {
    const errorMessage = {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
    return res.status(UNPROCESSABLE_ENTITY).json({err: errorMessage});
  }

  res.status(SC_OK).json(products);
});

module.exports = ProductsControllerRouter;
