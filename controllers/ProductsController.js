const ProductsModel = require('../models/ProductsModel');
const { Router } = require('express');

const ProductsRouter = Router();

ProductsRouter.post('/', async (req, res) => {
  const { name } = req.body;
  let { quantity } = req.body;
  quantity = Number(quantity);

  if (name.length < 5) {
    return res.status(422).json({ message: "\"name\" length must be at least 5 characters long" });
  }
  if (quantity <= 0) {
    return res.status(422).json({ message: "\"quantity\" must be larger than or equal to 1" });
  }
  if (typeof quantity === NaN) {
    return res.status(422).json({ message: "\"quantity must be a number" });
  }
  const { insertedId } = await ProductsModel.create(name, quantity);
  return res.status(201).json({ id: insertedId, name, quantity });
});
