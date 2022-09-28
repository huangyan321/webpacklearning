const path = require('path');

const resolve = function (url) {
  // eslint-disable-next-line no-undef
  return path.resolve(__dirname, url);
};
console.log(resolve('/dist/'));
module.exports = {
  entry: {
    main: resolve('./src/index.js'),
  },
  output: {
    filename: 'js/bundle.js',
    //输出文件路径，必须是绝对路径
    path: resolve('./dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          resolve('./loader/my-loader1.js'),
          resolve('./loader/my-loader2.js'),
          resolve('./loader/my-loader3.js'),
        ],
      },
    ],
  },
};
