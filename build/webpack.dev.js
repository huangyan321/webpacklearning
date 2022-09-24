const path = require('path');
const resolvePath = require('./resolve-path');

module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    hot: true,
    static: {
      directory: resolvePath('/public'),
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
    //在前端路由设置为history模式时，刷新页面会导致404的问题，devServer中可配置historyApiFallback=true解决
    //后端也一样
    historyApiFallback: {
      rewrite: [{ from: /abc/, to: '/index.html' }],
    },
  },
};
