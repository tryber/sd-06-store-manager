const controller = require('../../Controllers/saleControllers');

const IDLENGTH = 24;
const ERROR = 422;
const NOTFOUND = 404;
const NEGATIVE = -1;
const idArray = [];
const error = {
  code: 'not_found',
  message: 'Sale not found'
};

module.exports = async (req, res, next) => {
  const { id } = req.params;

  if(!id || id.length !== IDLENGTH ) {
    const err = {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    };

    return res.status(ERROR).send({ err: err });
  };

  if(idArray.indexOf(id) !== NEGATIVE) {
    return res.status(NOTFOUND).send({ err: error });
  }

  const saleCheck = await controller.findById(id);

  if(!saleCheck ) {
    return res.status(ERROR).send({ err: error });
  }

  idArray.push(id);

  next();
};
