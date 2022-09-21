const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.js',
    //必须是绝对路径
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      //解析js(x)
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        use: ['babel-loader'],
      },
      //解析图片资源
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
      // 解析css
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
      //解析less
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
      //解析ts
      {
        test: /\.ts$/,
        exclude: '/node_modules/',
        use: ['babel-loader'],
      },
      //解析scss
      {
        test: /\.scss$/,
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
          'postcss-loader',
          'sass-loader',
        ],
      },
      //解析vue
      {
        test: /\.vue$/,
        //vue-loader的使用必须依赖VueLoaderPlugin
        use: ['vue-loader'],
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
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
};
