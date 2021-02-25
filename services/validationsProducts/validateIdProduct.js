const { ObjectId } = require('mongodb');

const unprocessable = 422;

const validateIdProduct = (req, res, next) => {
  const { id } = req.params;

  if(!ObjectId.isValid(id)){
    res.status(unprocessable).json({ err: {
      code: 'invalid_data', message: 'Wrong id format'
    }});
  }
  next();
};

module.exports = validateIdProduct;