const babel = require('@babel/core');
module.exports = function (content) {
  const options = this.getOptions();
  let callback = this.async();
  console.log('================这里是babel-loader================');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  babel.transform(content, options, (err, res) => {
    if (err) {
      console.log(err);
      throw new Error(err);
    } else {
      callback(null, res.code);
    }
  });
};
