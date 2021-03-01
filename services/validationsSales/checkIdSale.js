const { ObjectId } = require('mongodb');

const NOT_FOUND = 404;

const checkIdSale = (req, res, next) => {
  const { id } = req.params;

  if(!ObjectId.isValid(id)){
    res.status(NOT_FOUND).json({ err: {
      code: 'not_found', message: 'Sale not found'
    }});
  }
  next();
};

module.exports = checkIdSale;