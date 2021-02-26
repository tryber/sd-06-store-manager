const code = 'invalid_data';

const throwThisError = (errorStatusCode, errorMessage, codeMessage = code) => {
  let err = new Error();
  err.statuscode = errorStatusCode;
  err.message = { 
    code: codeMessage, 
    message: errorMessage
  };
  throw err;  
};

module.exports = {
  throwThisError
};