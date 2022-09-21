const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.js',
    //必须是绝对路径
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  plugins: [
    //! 根据模板生成入口html
    new HtmlWebpackPlugin({
      title: 'lan bi tou',
      template: './public/index.html',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
};
