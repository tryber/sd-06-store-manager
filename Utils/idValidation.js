const UNCREATED = 422;
const IDLENGTH = 24;

module.exports = async (req, res, next) => {
  const { id } = req.params;

  if(!id || id.length !== IDLENGTH ) {
    const err = {
      code: 'invalid_data',
      message: 'Wrong id format'
    };

    return res.status(UNCREATED).send({ err: err });
  };

  next();
};
