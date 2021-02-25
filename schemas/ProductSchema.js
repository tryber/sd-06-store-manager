const errors = {
  name_blank: 'Inform a value for "name"',
  name_not_string: '"name" must be a string',
  name_length: '"name" length must be at least 5 characters long',
  qt_not_number: '"quantity" must be a number',
  qt_value: '"quantity" must be larger than or equal to 1'
};

const blank = (value) => (!value);
const isNotString = (value) => (typeof value !== 'string');
const isNotNumber = (value) => (typeof value !== 'number');
const haveLenght = (value, min) => (value.length < min );
const haveValue = (value) => (value < 1);

const validate = (name, quantity) => {
  const code = 'invalid_data';
  const status_code = 422;
  const size = 5;

  switch (true) {
  case blank(name): return { status_code, code, message: errors.name_blank };
  case isNotString(name): return { status_code, code, message: errors.name_not_string };
  case haveLenght(name, size): return { status_code, code, message: errors.name_length };
  case isNotNumber(quantity): return { status_code, code, message: errors.qt_not_number };
  case haveValue(quantity): return { status_code, code, message: errors.qt_value  };
  default: return {};
  }
};

module.exports = {
  validate
};
