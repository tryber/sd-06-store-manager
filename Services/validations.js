const minLength = 5;
const minQuantity = 0;

function nameIsValid(name) {
  if(name.length < minLength) {
    return false;
  }
  return true;
}

function quantityIsNumber(quantity) {
  if(typeof quantity !== 'number') {
    return false;
  }
  return true;
}

function quantityIsLessThanZero(quantity) { // Atenção no retorno !
  if(quantity < minQuantity) {
    return true;
  }
  return false;
}

function quantityIsEqualToZero(quantity) {
  if(quantity === minQuantity) {
    return true;
  }
  return false;
}

module.exports = {
  nameIsValid,
  quantityIsNumber,
  quantityIsLessThanZero,
  quantityIsEqualToZero,
};
