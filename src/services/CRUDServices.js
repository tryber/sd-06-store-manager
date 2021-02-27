const products = require('../models/dbActions');

const getAllService = async () => {
  const newProductsArray = await products.getAll();
  return newProductsArray
}

const createService = async (name, quantity) => {
  const { _id } = await products.create(name, quantity)
  return ({_id, name, quantity})
}
module.exports = {
  getAllService,
  createService,
}
