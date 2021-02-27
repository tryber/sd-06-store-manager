const { ObjectId } = require('mongodb');

const UNPROCESSABLE = 422;

const verifyObjectId = (req, res, next) => {
  const { id } = req.params;

  if(!ObjectId.isValid(id)){
    res.status(UNPROCESSABLE).json({ err: {
      code: 'invalid_data', message: 'Wrong sale ID format'
    }});
  }
  next();
};

module.exports = verifyObjectId;