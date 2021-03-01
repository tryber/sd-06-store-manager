const sales = require('../services/sales');
const routes = require('express').Router();
const rescue = require('express-rescue');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;



routes.route('/:id')
  .get(rescue(async (req, res) => {
    const { id } = req.params;
    const searchedSale = await sales.findById(id);

    if (searchedSale === null || searchedSale.err)
      return res.status(UNPROCESSABLE_ENTITY).json(searchedSale);

    res.status(OK).json(searchedSale);
  }))
  // .put(rescue(async (req, res) => {
  //   const { id } = req.params;
  //   const updateSale = req.body;
  //   const saleToUpdate = await sales.update(id, updateSale);

  //   if (saleToUpdate.err) return res.status(UNPROCESSABLE_ENTITY)
  //     .json(saleToUpdate);

  //   res.status(OK).json(saleToUpdate);
  // }))
  .delete(rescue(async (req, res) => {
    const { id } = req.params;
    const saleToDelete = await sales.deleteSale(id);

    if (saleToDelete === null || saleToDelete.err)
      return res.status(UNPROCESSABLE_ENTITY)
        .json(saleToDelete);

    res.status(OK).json(saleToDelete);
  }));

routes.route('/')
  .get(rescue(async (_req, res) => {
    const salesArray = await sales.getAll();

    res.status(OK).json({ sales: salesArray });
  }))
  .post(rescue(async (req, res) => {
    const sale = req.body;
    const createdSale = await sales.create(sale);
    
    if (createdSale.err) return res.status(UNPROCESSABLE_ENTITY)
      .json(createdSale);

    res.status(CREATED).json(createdSale);
  }));

module.exports = routes;
