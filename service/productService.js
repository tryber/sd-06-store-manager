const FIVE = 5;
const UNPROCESSABLE = 422;
const {
  getAllProduct,
  createProduct,
} = require('../models/productModel');

const createNewProduct = async (product) => createProduct(product);

const validateName = async (req, res, next) => {
  const { productName } = req.body.name;
  if (!productName || productName.length < FIVE) {
    return res.status(UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: '\"name"\ length must be at least 5 characters long'
        }
      });
  }
  const productList = await getAllProduct();
  const checkUnique = await productList.find((product) => product.name === productName);
  if (checkUnique) {
    return res.status(UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        }
      });
  }
  next();
};

const validateQuantity = async (req, res, next) => {
  const { productQuantity } = req.body.quantity;
  if (!productQuantity || productQuantity <= 0) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      }
    });
  }
};

module.exports = {
  validateName,
  createNewProduct,
  validateQuantity,
};
