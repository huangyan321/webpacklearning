const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob');
const resolvePath = require('./resolve-path');
const compressionWebpackPlugin = require('compression-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
//获取匹配到的文件
// const purgeFiles = glob.sync(`${resolvePath('/src')}/**/*`, { nodir: true });
// purgeFiles.push(resolvePath('/public/index.html'));

module.exports = {
  mode: 'production',

  plugins: [
    //! 清除dist资源
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
      chunkFilename: 'css/[name].[contenthash:6].chunk.min.css',
      ignoreOrder: false,
    }),
    new CSSMinimizerWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    // //将js文件嵌入到html模板中，用于减少http请求
    // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js$/]),
    //// 压缩
    // new compressionWebpackPlugin({
    //   threshold: 0,
    //   test: /\.(css|js)/,
    //   minRatio: 0.8,
    //   algorithm: 'gzip',
    // }),
  ],
  optimization: {
    //默认开启，标记未使用的函数，terser识别后可将其删除
    usedExports: true,
    // minimize: true,
    splitChunks: {
      //同步异步导入都进行处理
      chunks: 'all',
      //拆分块最小值
      // minSize: 20000,
      //拆分块最大值
      maxSize: 100000,
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
          enforce: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          filename: 'js/[id].common.js',
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    //单独打包运行时代码
    runtimeChunk: true,
    minimizer: [
      new TerserPlugin({
        //剥离注释
        extractComments: false,
        parallel: true,
        terserOptions: {},
      }),
      // new PurgeCSSPlugin({
      //   paths: purgeFiles,
      //   safelist: function () {
      //     return {
      //       standard: ['html', 'body'],
      //     };
      //   },
      // }),
    ],
  },
};
