const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          // loader: 'file-loader',
          loader: 'url-loader',
          options: {
            name: 'img/[name].[hash:6].[ext]',
            //!限制1kb以下的可以转成base64
            limit: 1024,
          },
        },
      },
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
    //! 清除dist资源
    new CleanWebpackPlugin(),
    //! 定义全局常量
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
    //! 用于复制资源
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            //! 选择要忽略的文件
            ignore: ['**/index.html', '**/.DS_store'],
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
};
