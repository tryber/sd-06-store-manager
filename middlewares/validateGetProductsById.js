const { searchForProductId } = require('../models/productsModel');

const BAD = 422;
const SUCCESS = 200;

const validateGetProductsById = async function (req, res, next) {
  try {
    const { id } = req.params;

    const foundProduct = await searchForProductId(id);

    if(!foundProduct) {
      return res.status(BAD).json(
        {
          err:
          {
            code: 'invalid_data',
            message: 'Wrong id format'
          }
        }
      );
    }

    return res.status(SUCCESS).json(foundProduct);

    next();
  } catch (error) {
    console.log(error);
  }



};

module.exports = {
  validateGetProductsById,
};