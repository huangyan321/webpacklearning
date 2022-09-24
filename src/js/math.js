import _ from 'lodash';

function sum(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
console.log(_.join([1, 2, 3, 4, 5, 6]));
const res = new Promise((resolve, reject) => {
  resolve(1);
});
module.exports = { sum, sub, res };
