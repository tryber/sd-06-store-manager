const errorInterno = 500;

module.exports = (err, request, response, next) => {
  console.log(err);
  return response.status(errorInterno ).json({ message: 'Erro Interno '});
};
