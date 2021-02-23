const minimumLength = 5;
const minimumNumber = 0;
const UNCREATED = 422;


module.exports = async(req, res, next) => {
  const { name, quantity } = req.body;

  if(!name || name.length < minimumLength) {
    const err = {
      code: 'invalid_data',
      message: '\"name\" length must be at least 5 characters long'
    };

    return res.status(UNCREATED).send({ err: err });
  }

  if(quantity <= minimumNumber) {
    const err = {
      code: 'invalid_data',
      message: '\"quantity\" must be larger than or equal to 1'
    };

    return res.status(UNCREATED).send({ err: err });
  }

  if(typeof(quantity) !== 'number') {
    const err = {
      code: 'invalid_data',
      message: '\"quantity\" must be a number'
    };

    return res.status(UNCREATED).send({ err: err });
  }


  next();
};
