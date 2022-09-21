function sum(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
const res = new Promise((resolve, reject) => {
  resolve(1);
});
module.exports = { sum, sub, res };
