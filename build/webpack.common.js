const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin, ProvidePlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const resolvePath = require('./resolve-path');
module.exports = function (env) {
  const isProduction = !!env.production;
  process.env.isProduction = isProduction;
  const baseConfig = isProduction => {
    return {
      entry: {
        main: resolvePath('/src/main.js'),
        // 'entry-2': resolvePath('/src/entry-2.js'),
      },
      output: {
        filename: 'js/[name].bundle.js',
        //必须是绝对路径
        path: resolvePath('/dist'),
        //异步导入块名
        chunkFilename: 'js/[name].[hash:6].chunk.js',
        //相对路径，解析相对与dist的文件
        // publicPath: './',
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
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
          template: resolvePath('/public/index.html'),
        }),
        //! 定义全局常量
        new DefinePlugin({
          BASE_URL: '"./"',
        }),
        //! 用于复制资源
        new CopyWebpackPlugin({
          patterns: [
            {
              from: 'public',
              to: 'static',
              globOptions: {
                //! 选择要忽略的文件
                ignore: ['**/index.html', '**/.DS_store'],
              },
            },
          ],
        }),
        new VueLoaderPlugin(),
        // 不建议使用
        // shimming(预支变量)
        new ProvidePlugin({
          //当代码遇到某个变量找不到时，通过ProvidePlugin，自动导入对应的库
          //比如node_modules中的某个依赖用到了axios，但是他默认了全局有安装axios，所以没有导入它，这时候使用以下配置
          // axios: 'axios'
          // 使用数组形式可以调用axios中的get方法
          // get: ['axios','get']
        }),
      ],
      resolve: {
        alias: {
          '@': resolvePath('/src'),
          '*vue': '@/vue',
          '*react': '@/react',
          '*js': '@/js',
          '*img': '@/img',
          '*css': '@/css',
          '*public': '@/public',
        },
        extensions: ['.js', '.vue', '.json', '.ts', '.jsx', '.less'],
        //解析目录时用到的文件名
        mainFiles: ['index'],
      },
      optimization: {
        splitChunks: {
          //同步异步导入都进行处理
          chunks: 'all',
          //拆分块最小值
          // minSize: 20000,
          //拆分块最大值
          // maxSize: 20000,
          //表示引入的包，至少被导入几次的才会进行分包，这里是1次
          // minChunks: 1,
          // 包名id算法
          // chunkIds: 'named',
          cacheGroups: {
            vendors: {
              // name: 'chunk-vendors',
              //所有来自node_modules的包都会打包到vendors里面,可能会过大,所以可以自定义选择打包
              test: /[\\/]node_modules[\\/](react|react-dom|vue)[\\/]/,
              filename: 'js/[id].vendors.js',
              chunks: 'all',
              //处理优先级
              priority: -10,
            },
            default: {
              minChunks: 2,
              priority: -20,
              filename: 'js/[id].common.js',
              reuseExistingChunk: true,
            },
          },
        },
        //单独打包运行时代码
        runtimeChunk: true,
        minimizer: [
          new TerserPlugin({
            //剥离注释
            extractComments: false,
          }),
        ],
      },
    };
  };
  const config = baseConfig(isProduction)
  const mergedConfig = isProduction
    ? merge(config, require('./webpack.prod'))
    : merge(config, require('./webpack.dev'));
  return mergedConfig;
};
