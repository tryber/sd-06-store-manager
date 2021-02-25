const UNPROCESS = 422;

const isName = async (req, res, next) => {
  const name = req.body.name;

  if (name.length < FIVE) return res.status(UNPROCESS).json({err: 
      {code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long'
      }});
  next();
};

module.exports = {
  isName,
};
