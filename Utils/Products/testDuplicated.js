const connection = require('../../Models/connection');

const NONE = 0;
const UNCREATED = 422;

module.exports = async (req, res, next) => {
  const { name } = req.body;

  const equals = await connection().then((db => db.collection('products')
    .find({ name: name }).toArray()));

  if(equals.length !== NONE) {
    const err = {
      code: 'invalid_data',
      message: 'Product already exists'
    };

    return res.status(UNCREATED).json({ err: err});
  }

  next();
};
