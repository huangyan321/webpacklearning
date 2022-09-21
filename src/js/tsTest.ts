const num = 123;
const str = '';
type obj = {
  a: string;
  b: Array<number>;
  c: object;
};
const a: obj = {
  a: '123',
  b: [1, 2, 3],
  c: { a: 1 },
};

console.log(num);
const res = new Promise((resolve, reject) => {
  resolve(1);
});
exports.num = { num, str, a, res };
