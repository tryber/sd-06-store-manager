const { ObjectId } = require('mongodb');

const NOTFOUND = 404;

module.exports = async (req, res, next) => {
  const { id } = req.params;

  if(!ObjectId.isValid(id)) {
    const err = {
      code: 'not_found',
      message: 'Sale not found'
    };

    return res.status(NOTFOUND).send({ err: err });
  };

  next();
};
