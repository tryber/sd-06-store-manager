const rescue = require('express-rescue');
const { ObjectID } = require('mongodb');

const {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
} = require('../models/salesModel');

const {
  quantityIsNumber,
  quantityIsLessThanZero,
  quantityIsEqualToZero,
} = require('../Services/validations');

const SUCCESS = 200;
const ENTITY = 422;
const NOTFOUND = 404;

const ListAllSales = rescue(async (_req, res, _next) => {
  return res.status(SUCCESS).json({ sales: await getAllSales() });
});

const ListSaleById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(NOTFOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  return res.status(SUCCESS).json(await getSaleById(id));
});

const createNewSale = rescue(async (req, res, _next) => {
  const sales = req.body;
  //console.log(sale);
  sales.forEach((sale) => {
    if (quantityIsLessThanZero(sale.quantity) || quantityIsEqualToZero(sale.quantity)) {
      return res.status(ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    if (!quantityIsNumber(sale.quantity)) {
      return res.status(ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  });

  const newSale = await addSale(sales);

  return res.status(SUCCESS).json(
    { _id: newSale.insertedId, itensSold: sales },
  );
});

const updateSaleById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;
  // const requestArray = req.body;
  // requestArray.map((request) => {
  //   if(quantityIsLessThanZero(request.quantity) || !quantityIsNumber(quantity)) {
  //     return  res.status(ENTITY).json({
  //       err: {
  //         code: 'invalid_data',
  //         message: 'Wrong product ID or invalid quantity',
  //       },
  //     });
  //   }
  // });
  if (quantityIsLessThanZero(quantity)) {
    return res.status(ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  if (!quantityIsNumber(quantity)) {
    return res.status(ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  await updateSale(id, productId, quantity);
  return res.status(SUCCESS).json(await getSaleById(id));
});

const deleteSaleById = rescue(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }

  const sale = await getSaleById(id);

  if (!sale) {
    res.status(NOTFOUND).json({ not_found: true });
  }

  await deleteSale(id);
  res.status(SUCCESS).json({ deleted: true });
});

module.exports = {
  ListAllSales,
  ListSaleById,
  createNewSale,
  updateSaleById,
  deleteSaleById,
}; 