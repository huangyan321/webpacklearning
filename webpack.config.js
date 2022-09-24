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
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    //为静态文件使用gzip压缩
    compress: true,
    port: 9000,
    //为 带/api的请求开启代理
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        //将/api重写成空字符串
        pathRewrite: {
          '^/api': '',
        },
        //是否校验http正式是否合法
        secure: false,
        //改变http head的源为target
        changeOrigin: true,
      },
    },
  module: {
    rules: [
      //解析js(x)
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /core-js/,
        use: ['babel-loader'],
        //或者这种方法,可以编译node_modules,除了core-js
        // include: {
        //   and: [/node_modules/],
        //   not: [/core-js/]
        // },
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
      // 解析字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
      //解析vue文件,并提供HMR支持
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
    extensions: ['.js', '.vue', '.json', '.ts', '.jsx', '.less'],
    //解析目录时用到的文件名
    mainFiles: ['index'],
  },
};
