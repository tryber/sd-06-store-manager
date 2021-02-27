const productRouter = require('../controllers/productController');
const productModel = require('../models/productModel');

const Erro422 = 422;

const addProduct = async (newProduct) => {
  return await productModel.addProduct(newProduct);
};

const allProducts = async () => {
  return await productModel.allProducts();
};

const checkProduct = async (request, response, next) => {
  const { name } = request.body;
  const productList = await productModel.allProducts();
  const existProd = await productList.find((product) => product.name === name);
  
  if (existProd) {
    return response.status(Erro422).json(
      {
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        },
      }
    );
  }
  
  next();
};

const validateProduct = async (request, response, next) => {
  const { name, quantity } = request.body;
  const five = 5;
  
  if(name.length < five) {
    return response.status(Erro422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
    });
  } else if (quantity < 1) {
    return response.status(Erro422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      },
    });
  } else if (typeof quantity !== 'number') {
    return response.status(Erro422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      },
    });
  }
  
  next();
};

module.exports = { addProduct, validateProduct, checkProduct, allProducts };