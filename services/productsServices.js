const { create } = require('../models/productsModels')
const { status } = require('../util/dataStatus');

const createProduct = async (req, res) => {
    const { name, quantidy } = req.body
    const result = await create(name, quantidy);

    return res.status(status.create).json(result)
};


module.exports = {
    createProduct
  };