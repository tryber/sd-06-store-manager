const yup = require('yup');
const Product = require('../models/Product');
const Sales = require('../models/Sales');
const nameMinLength = 5;
const minQuantity = 1;


const ProductSchema = yup.object().shape({
  name: yup.string('')
    .min(nameMinLength, '\"name\" length must be at least 5 characters long'),
  quantity: yup.number().typeError('\"quantity\" must be a number')
    .min(minQuantity, '\"quantity\" must be larger than or equal to 1')
});

const SalesSchema = yup.object().shape({
  productId: yup.string().required(),
  quantity: yup.number().typeError('Wrong product ID or invalid quantity')
    .min(minQuantity, 'Wrong product ID or invalid quantity').required()  
});



module.exports = {
  ProductSchema,
  SalesSchema 
};
