const errorMessage = (msg) => {
  return {
    err: {
      code: 'invalid_data',
      message: msg
    }
  };
};

module.exports = errorMessage;