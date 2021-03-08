const express = require('express');
const status201 = 201;
const status200 = 200;
const magicNumberzero = 0;
const { ObjectId } = require('mongodb');

// import middlewares
const {
  validateQuantityGreaterEqual0,
  validateQuantityNotString
} = require('../services/middlewaresSales');
// --------------------------------------
// import querys
const {
  createSales,
} = require('../models/querysSales');
// -------------------------------------------

const salesRouter = express.Router();

salesRouter.post('/', validateQuantityGreaterEqual0,
  validateQuantityNotString, async (req, res) => {
    const products = req.body;
    await createSales(products);
    const { insertedId } = await createSales(products);
    return res.status(status200).json({_id: insertedId, itensSold: products });
  });

salesRouter.get('/sales', async (req, res) => {});

module.exports = salesRouter;