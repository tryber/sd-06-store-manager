const Products = require('../models/Products');

module.exports = async (id) => {
  const productById = await Products.findById(id);
  
  if (!productById) throw({ err: {
    'code': 'invalid_data',
    'message': 'Wrong id format'
  }});
};