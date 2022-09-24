const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',

  plugins: [
    //! 清除dist资源
    new CleanWebpackPlugin(),
  ],
};
