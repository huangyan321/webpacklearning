const nnumber = 123;
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

console.log(nnumber);
const res = new Promise((resolve, reject) => {
  resolve(1);
});
export { a, nnumber };
