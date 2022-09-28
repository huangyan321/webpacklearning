const babel = require('@babel/core');
module.exports = function (content) {
  const options = this.getOptions();
  let str = '';
  let callback = this.async();
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  babel.transform(content, options, (err, res) => {
    if (err) {
      console.log(err);
      throw new Error(err);
    } else {
      str = res.code;
      callback(null, str);
    }
  });
};
