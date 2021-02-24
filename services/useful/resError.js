// const resError = (bool, res, message, status) => {
//   if (bool) {
//     if (status) {
//       res.status(status).json({ message });
//     } else {
//       res.json({ message });
//     }
//     return false;
//   }
//   return true;
// };

const resErrorPai = (res) => {
  const resError = (bool, message, status) => {
    if (bool) {
      if (status) {
        res.status(status).json({ err: { code:'invalid_data', message }});
      } else {
        res.json({ err: { code:'invalid_data', message }});
      }
      return false;
    }
    return true;
  };
  return { resError };
};

module.exports = resErrorPai;
