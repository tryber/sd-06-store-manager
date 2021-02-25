const ProductController = require('../controllers/ProductController');
const Product = require('../models/ProductsModel');
const { validationCreate, validationUpdate, validationId } = require('./Validations');

// Desafio 1 - Cadastra um produto
const createProduct = async (name, quantity) => {
  const validation = await validationCreate(name, quantity);
  if(validation) return validation;
  return await Product.createProduct(name, quantity);
};

// Desafio 2 - Busca todos os produtos
const getAllProducts = async () => {
  return await Product.getAllProducts();
};

// Desafio 2 - Busca um produto pelo id
const findByIdProduct = async (id) => {
  const validation = validationId(id);
  if(validation) return validation;
  return await Product.findByIdProduct(id);
};

// Desafio 3 - Atualizar um produto pelo id
const updateByIdProduct = async (id, name, quantity) => {
  const validation = await validationUpdate(name, quantity);
  if(validation) return validation;
  return await Product.updateByIdProduct(id, name, quantity);
};

// Desafio 4 - Deletar um produto pelo id
const deleteByIdProduct = async (id) => {
  const product = findByIdProduct(id);
  await Product.deleteByIdProduct(id);
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  findByIdProduct,
  updateByIdProduct,
  deleteByIdProduct,
};

