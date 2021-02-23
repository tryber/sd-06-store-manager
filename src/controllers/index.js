const {
  createProduct,
  searchProducts,
  searchProduct
} = require('../models/products');

const Ok = 200;
const Created = 201;
const UNPROCESSABLE_ENTITY = 422;

const createProduts = async (req, res) => {
  const DbNewProduct = await createProduct(req.body);

  return res.status(Created).json(DbNewProduct.ops[0]);
};


const searchAllProduts = async (_req, res) => {
  const allProducts = await searchProducts();

  return res.status(Ok).json({ products: allProducts });
};


const searchOneProdut = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await searchProduct(String(id));

    return res.status(Ok).json(product);

  } catch {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
};


module.exports = {
  createProduts,
  searchAllProduts,
  searchOneProdut
};
