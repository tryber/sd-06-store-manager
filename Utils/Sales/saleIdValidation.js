const NOTFOUND = 404;
const IDLENGTH = 24;

module.exports = async (req, res, next) => {
  const { id } = req.params;

  if(!id || id.length !== IDLENGTH ) {
    const err = {
      code: 'not_found',
      message: 'Sale not found'
    };

    return res.status(NOTFOUND).send({ err: err });
  };

  next();
};
