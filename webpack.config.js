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
  module: {
    rules: [
      {
        test: /\.css$/,
        //转换规则： 从下往上
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              //! 这个选项可以让css处理@import语法时回退到上一个loader再次对导入的文件做处理
              importLoaders: 1,
            },
          },
          //! 或者可以直接写一个配置文件 这样只需要postcss-loader就行
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          'less-loader',
        ],
      },
    ],
  },
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
