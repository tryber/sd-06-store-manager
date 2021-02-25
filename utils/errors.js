function generateError(status, code, message) {
  return {
    err: {
      code, status, message
    }
  };
}

module.exports = {
  generateError
};
