const status_ue = 422;
const status_c = 201;
const status_s = 200;
const status_nf = 404;
const error = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};
const ZERO = 0;

const verifyQuantity = (q) => {
  let message = '';
  let status = ZERO;
  let isValid = true;

  const tQ = typeof(q) === 'string';
  const lQ = q <= ZERO;

  if (tQ) {
    message = '"quantity" must be a number';
    status = status_ue;
    isValid = false;
  }

  if (lQ) {
    message = '"quantity" must be larger than or equal to 1';
    status = status_ue;
    isValid = false;
  }

  error.err.message = message;

  return { error, status, isValid };
};

module.exports = {
  verifyQuantity,
};
