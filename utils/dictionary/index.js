const handleMessage = require('./handleMessage');

const STATUS = {
  badRequest: 400,
  unpEntity: 422,
};

module.exports = {
  error : {
    invalidId: handleMessage(
      'Wrong id format', STATUS.unpEntity
    ),
    invalidProductName: handleMessage(
      'Product already exists', STATUS.unpEntity
    ),
    invalidProductNameSize: handleMessage(
      '"name" length must be at least 5 characters long', STATUS.unpEntity
    ),
    invalidProductQuantity: handleMessage(
      '"quantity" must be larger than or equal to 1', STATUS.unpEntity
    ),
    invalidProductQuantityType: handleMessage(
      '"quantity" must be a number', STATUS.unpEntity
    ),
    unexpected: handleMessage('Unexpected error'),
  },
  validations: {
    nameSize: 5,
    minQuantity: 1,
  },
  status: {
    badRequest: 400,
    created: 201,
    ok: 200,
    unpEntity: 422,
  },
  magicNumbers: {
    zero: 0,
  }
};
