const {
  createProduct,
  searchProducts,
  searchProduct,
  updateProductById,
  deleteProductById,
} = require('../models/products');

const {
  createSale,
  allSales,
  filterSaleById,
  updateSale
} = require('../models/sales');

const Ok = 200;
const Created = 201;
const NOT_FOUND = 404;
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

  const DbNewSale = await createSale(req.body);

  return res.status(Ok).json(DbNewSale.ops[0]);
};


const searchAllSales = async (_req, res) => {
  const sales = await allSales();

  return res.status(Ok).json({
    sales: sales
  });
};


const SearchSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const sales = await filterSaleById(id);

    return res.status(Ok).json(sales);

  } catch {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }
};


const updateSaleById = async (req, res) => {
  const { id } = req.params;

  await updateSale(req.body, id);

  const saleUpdate = await filterSaleById(id);

  return res.status(Ok).json(saleUpdate);
};



module.exports = {
  createProduts,
  searchAllProduts,
  searchOneProdut,
  updateProdut,
  deleteProdut,
  createSales,
  searchAllSales,
  SearchSaleById,
  updateSaleById
};
