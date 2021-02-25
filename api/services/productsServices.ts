import { productsModel } from '../models'

interface props {
  id?: string
  name?: string
  quantity?: number
}

const validationName = (name: string) => name.length >= 5;
const validationQuantity = (quantity: number) => quantity > 0;

export const getAll = async () => {
  const response = { status: 0, body: {} };
  const requestResponse = await productsModel.getAll();
  if(requestResponse.error !== undefined) {
    response.status = 400;
    response.body = {};
  } else {
    response.status = 200;
    response.body = { products: requestResponse }; 
  }

  return response;
}

export const getById = async ({ id }: props) => {
  const response = { status: 0, body: {} };
  const requestResponse = await productsModel.getById({ id })
  if(requestResponse.error) {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    }
  } else {
    response.status = 200;
    response.body = requestResponse;
  } 

  return response;
}

export const create = async ({ name, quantity }: props) => {
  const response = { status: 0, body: {} };
  if(!validationName(name)) {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long',
      }
    }
  } else if(typeof(quantity) !== 'number') {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number',
      }
    }
  } else if(!validationQuantity(quantity)) {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1',
      }
    }
  } else {
    const requestResponse = await productsModel.create({ name, quantity });
    if (requestResponse.error) {
      response.status = 422;
      response.body = {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        }
      }
    } else {
      response.status = 201;
      response.body = {
        _id: requestResponse,
        name,
        quantity
      }
    }
  }

  return response;
}

export const update = async ({ id, name, quantity }: props) => {
  const response = { status: 0, body: {} };
  if(!validationName(name)) {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long',
      }
    }
  } else if(typeof(quantity) !== 'number') {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number',
      }
    }
  } else if(!validationQuantity(quantity)) {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1',
      }
    }
  } else {
    const requestResponse = await productsModel.update({ id, name, quantity });
    if (requestResponse.error) {
      response.status = 422;
      response.body = {
        err: {
          code: 'invalid_data',
          message: 'Product does not exists yet',
        }
      }
    } else {
      response.status = 200;
      response.body = {
        _id: id,
        name,
        quantity
      }
    }
  }

  return response;
}

export const remove = async ({ id }: props) => {
  const response = { status: 0, body: {} };
  
  const requestResponse = await productsModel.remove({ id });
  if (requestResponse.error) {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    }
  } else {
    response.status = 200;
    response.body = requestResponse.value
  }

  return response;
}

