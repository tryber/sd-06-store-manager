const Sales = require('../models/Sales');
const { ObjectId } = require('mongodb');

module.exports = async (id) => {
  const saleById = await Sales.findById(id);
  
  if (!saleById) throw({ err: {
    'code': 'not_found',
    'message': 'Sale not found'
  }});
};