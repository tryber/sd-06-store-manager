const Products = require('../models/Products');

const create = async (name, quantity) => {
  return await Products.create(name, quantity);
};

module.exports = {
  create
};