const {
  createProduct,
  searchProducts,
  searchProduct,
  updateProductById,
  deleteProductById,
} = require('../models/products');

const {
  createSale
} = require('../models/sales');

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


const updateProdut = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const product = await updateProductById(name, quantity, id);

  return res.status(Ok).json({
    _id: id,
    name,
    quantity
  });
};


const deleteProdut = async (req, res) => {
  try {
    const { id } = req.params;

    const { _id, name, quantity } = await deleteProductById(id);

    return res.status(Ok).json({
      _id,
      name,
      quantity
    });
  } catch {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
};


const createSales = async (req, res) => {
  const products = req.body;

  const DbNewSale = await createSale(req.body);

  const productsSold = products.map(item => ({
    productId: item.productId,
    quantity: item.quantity
  }));

  return res.status(Ok).json({
    _id: DbNewSale.ops[0]._id,
    itensSold: productsSold
  });
};


module.exports = {
  createProduts,
  searchAllProduts,
  searchOneProdut,
  updateProdut,
  deleteProdut,
  createSales
};
