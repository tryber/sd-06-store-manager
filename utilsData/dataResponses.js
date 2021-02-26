const errorMessages = {
  invalid_name : {err: { code: 'invalid_data',
    message: '"name" length must be at least 5 characters long' }},

  repeat_name: {err: { code: 'invalid_data', 
    message: 'Product already exists' }},

  larger_zero: {err: { code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1' }},

  type_string: {err: { code: 'invalid_data', 
    message: '"quantity" must be a number'}},

  not_id: {err: { code: 'invalid_data', message: 'Wrong id format'}},

  qtt_invalid: {err: { code: 'invalid_data', 
    message: 'Wrong product ID or invalid quantity'}},

  salesNot_id: {err: { code: 'not_found', 
    message: 'Sale not found'}}
};

const status = {
  Unprocessable_Entity:422,
  created: 201,
  OK:200,
  not_found: 404
};

module.exports={
  errorMessages,
  status
};
