const yup = require('yup');
const nameMinLength = 5;
const minQuantity = 1;
const error = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const ProductSchema = yup.object().shape({
  name: yup.string('')
    .min(nameMinLength, '\"name\" length must be at least 5 characters long'),
  quantity: yup.number().typeError('\"quantity\" must be a number')
    .min(minQuantity, '\"quantity\" must be larger than or equal to 1')
});

module.exports = {
  ProductSchema, error
};
