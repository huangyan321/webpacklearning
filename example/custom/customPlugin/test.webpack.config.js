const path = require('path');
const AutoUploadPlugin = require('./plugin/AutoUploadPlugin');
const resolve = function (url) {
  // eslint-disable-next-line no-undef
  return path.resolve(__dirname, url);
};
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
  module: {},
  plugins: [
    new AutoUploadPlugin({
      host: '',
      username: '',
      password: '',
      remoteDirectory: '',
    }),
  ],
};
