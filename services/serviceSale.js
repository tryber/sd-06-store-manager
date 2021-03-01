const model = require('../models/modelSale');

const getAllSales = async () => {
  return model.getAllSales();
};

const getByIdSale = async (id) => {
  const sale = await model.getByIdSale(id);

  if(!sale){
    return {
      error: true,
      code: 'not_found',
      message: `sale with id ${id} not found`,
    };
  }

  return sale;
};

const createSale = async (product) => {

  const newSale = await model.createSale(product);
  // console.log('newSale', newSale);
  // console.log('product', product);
  return newSale;
};

const updateSale = async(id, productId, quantity) => {
  await model.updateSale(id, productId, quantity);

  const update = {
    _id: id,
    itensSold: [
      {productId,
        quantity},
    ]
  };
  // console.log('update', update);
  return update;
};

const excludeSale = async (id) => await model.excludeSale(id);

module.exports = {
  excludeSale,
  updateSale,
  createSale,
  getByIdSale,
  getAllSales,
};