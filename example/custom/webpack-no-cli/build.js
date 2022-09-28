const webpack = require('webpack');
const webpackConfig = require('../../../build/webpack.common.js')({ production: true });

const compiler = webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.log(err);
  } else {
    console.log(stats);
  }
});
// console.log(compiler);