const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  mode: 'production',

  plugins: [
    //! 清除dist资源
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
    }),
    new CSSMinimizerWebpackPlugin(),
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
        parallel: true,
        terserOptions: {},
      }),
    ],
  },
};
