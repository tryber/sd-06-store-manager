const FIVE = 5;
const UNPROCESSABLE = 422;

const validateName = async (req, res, next) => {
  const { productName } = req.body.name;
  if (!productName || productName.length < FIVE) {
    return res.status(UNPROCESSABLE)
      .json({ message: '\"name"\ length must be at least 5 characters long'});
  }
};

module.exports = { validateName };
