const Products = require('../models/productsModel.js');

const validateProduct = async (name, quantity, id ) => {
  const MAX_CHAR = 5;
  if(name.length <= MAX_CHAR) {
    throw new Error('\"name\" length must be at least 5 characters long');
  }
  if(quantity < 1) {
    throw new Error('\"quantity\" must be larger than or equal to 1');
  }
  if (typeof quantity === 'string') throw new Error('\"quantity\" must be a number');

  if (!id) {
    const products = await Products.getAll();
    products.map(prod => {
      if (prod.name === name) {
        throw new Error('Product already exists');
      }
    });
  }
};


const getAll = async () => {
  return await Products.getAll();
};

const getById = async (id) => {
  const product = await Products.getById(id);
  if (!product) throw new Error('Wrong id format');
  return product;
};

const create = async (name, quantity) => {
  await validateProduct(name, quantity);
  return Products.create(name, quantity);
};

const update = async (id, name, quantity) => {
  await validateProduct(name, quantity, id);
  return await Products.update(id, name, quantity);
};

const remove = async (id) => {
  const product = await Products.getById(id);
  if (!product) throw new Error('Wrong id format');
  return await Products.remove(id);
};



module.exports = {
  getAll,
  create,
  getById,
  update,
  remove
};
