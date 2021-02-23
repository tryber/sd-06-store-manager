const errorMessage = (msg) => {
  return {
    err: {
      code: 'invalid-data',
      message: msg
    }
  };
};

module.exports = errorMessage;