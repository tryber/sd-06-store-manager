const rescue = require('express-rescue');
const salesModel = require('../models/salesModel');

const getAll = rescue(async (_req, res, _next) => {
  const response = await salesModel.getAll();
  return res.status(200).json({ sales: response });
});

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  if (id.length < 12) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  const sale = await salesModel.getById(id);
  return res.status(200).json(sale);
});

const createSale = rescue(async (req, res, _next) => {
  const sale = req.body;
  sale.forEach((venda) => {
    if (venda.quantity <= 0) {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    if (typeof venda.quantity === 'string') {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  });
  const insertedSale = await salesModel.createSale(sale);
  return res.status(200).json(
    { _id: insertedSale.insertedId, itensSold: sale },
  );
});

const updateSale = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  if (quantity <= 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  if (typeof quantity !== 'number') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  await salesModel.updateSale(id, productId, quantity);
  return res.status(200).json({ _id: id, itensSold: [{ productId, quantity }] });
});

const deleteSale = rescue(async (req, res, next) => {
  const { id } = req.params;
  if (id.length < 12) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
  const sale = await salesModel.getById(id);
  if (sale !== null) {
    await salesModel.deleteSale(id);
    res.status(200).json({ deleted: true });
    return next();
  }
});

const checkSale = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const sale = await salesModel.getById(id);
  console.log(id)
  if (sale === null) {
    await salesModel.deleteSale(id);
    res.status(404).json({ not_found: true });
  }
});

module.exports = { createSale, getAll, getById, updateSale, deleteSale, checkSale };
