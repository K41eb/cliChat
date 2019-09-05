function isValidString(str) {
  return typeof str ==='string' && str.length > 0;
}
function isValidNumber(number) {
  return !isNaN(number) && number >= 0;
}


module.exports = {
  isValidNumber,
  isValidString,
};