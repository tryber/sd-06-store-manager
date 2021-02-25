import { salesModel } from '../models'
import { productsServices } from './'

interface props {
  id?: string
  itensSold?: { productId: string, quantity: number }[]
}

const validationProductId = async (id: string) => {
    const response = await productsServices.getById({ id })
      .then(res => res.body['_id'] !== undefined)
    return response;
};

const validationIds = (ids: string[]) => {
  return new Promise((resolve, reject) => {
    let validations = []
    ids.map(async (id) => {
        validations.push(await validationProductId(id))
        if (validations.length === ids.length) resolve(!validations.includes(false))
      })
  })
};

const validationQuantities = (quantites: number[]) => {
  const validationsType = quantites.map(quantity => typeof(quantity) === 'number')
  const validationsValue = quantites.map(quantity => quantity > 0)
  return !validationsValue.includes(false) && !validationsType.includes(false)
}

export const getAll = async () => {
  const response = { status: 0, body: {} };
  const requestResponse = await salesModel.getAll();
  if(requestResponse.error !== undefined) {
    response.status = 400;
    response.body = {};
  } else {
    response.status = 200;
    response.body = { sales: requestResponse };
  }

  return response;
}

export const getById = async ({ id }: props) => {
  const response = { status: 0, body: {} };
  const requestResponse = await salesModel.getById({ id })
  if(requestResponse === null) {
    response.status = 404;
    response.body = {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    }
  } else if(requestResponse.error) {
    response.status = 404;
    response.body = {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    }
  } else {
    response.status = 200;
    response.body = requestResponse;
  } 

  return response;
}

export const create = async ({ itensSold }: props) => {
  const response = { status: 0, body: {} };

  const productsIds = itensSold.map(item => item.productId);
  const productsQuantities = itensSold.map(item => item.quantity);

  let idsValidation;
  await validationIds(productsIds).then(r => idsValidation = r);

  if(!validationQuantities(productsQuantities)) {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    }
  } else {
    let idsValidation;
    await validationIds(productsIds).then(r => idsValidation = r);
    if (!idsValidation) {
      response.status = 422;
      response.body = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      }
    } else {
      const requestResponse = await salesModel.create({ itensSold });
      if (requestResponse.error) {
        response.status = 422;
        response.body = {
          err: {
            code: 'invalid_data',
            message: 'Product already exists',
          }
        }
      } else {
        response.status = 200;
        response.body = {
          _id: requestResponse,
          itensSold
        }
      }
    }
  }

  return response;
}

export const update = async ({ id, itensSold }: props) => {
  const response = { status: 0, body: {} };

  const productsIds = itensSold.map(item => item.productId);
  const productsQuantities = itensSold.map(item => item.quantity);

  let idsValidation;
  await validationIds(productsIds).then(r => idsValidation = r);

  if(!validationQuantities(productsQuantities)) {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    }
  } else {
    let idsValidation;
    await validationIds(productsIds).then(r => idsValidation = r);
    if (!idsValidation) {
      response.status = 422;
      response.body = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      }
    } else {
      const requestResponse = await salesModel.update({ id, itensSold });
      if (requestResponse.error) {
        response.status = 422;
        response.body = {
          err: {
            code: 'invalid_data',
            message: 'Product already exists',
          }
        }
      } else {
        response.status = 200;
        response.body = {
          _id: id,
          itensSold
        }
      }
    }
  }

  return response;
}

export const remove = async ({ id }: props) => {
  const response = { status: 0, body: {} };
  
  const requestResponse = await salesModel.remove({ id });
  if (requestResponse.error) {
    response.status = 422;
    response.body = {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    }
  } else {
    response.status = 200;
    response.body = requestResponse.value
  }

  return response;
}
