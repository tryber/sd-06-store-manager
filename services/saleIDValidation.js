const Sales = require('../models/Sales');
const { ObjectId } = require('mongodb');

module.exports = async (id) => {
  if(!ObjectId.isValid(id)) throw({ err: {
    'code': 'invalid_data',
    'message': 'Wrong sale ID format'
  }});
};