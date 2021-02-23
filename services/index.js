// const invalidData = 422;

// const validateProduct = (req, res, next) => {
//   const { name, quantity } = req.body;

//   if (typeof name !== String || name.length <= 5) {
//     return res.status(invalidData).json({ err: {
//       code: 'invalid_data',
//       message: '"name" length must be at least 5 characters long',
//     }}
//     );
//   };

//   return next();
// };

// exports.module = {
//   validateProduct,
// };
