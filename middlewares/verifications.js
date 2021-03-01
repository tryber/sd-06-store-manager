const UnprocessableEntity = 422;
// const success = 200;
// const successCreated = 201;
// const notFound = 404;
const zero = 0;

const error = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const verifyQuantity = (q) => {
  let message = '';
  let status = zero;
  let isValid = true;

  const tQ = typeof(q) === 'string';
  const lQ = q <= zero;

  if (tQ) {
    message = '"quantity" must be a number';
    status = UnprocessableEntity;
    isValid = false;
  }

  if (lQ) {
    message = '"quantity" must be larger than or equal to 1';
    status = UnprocessableEntity;
    isValid = false;
  }

  error.err.message = message;

  return { error, status, isValid };
};

module.exports = {
  verifyQuantity,
};
