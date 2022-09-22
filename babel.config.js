module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        //false 不用任何的polyfill代码
        //usage 有用到什么就引入什么
        //entry 手动在入口文件导入core-js/regenerator-runtime,根据目标浏览器引入对应polyfill
        useBuiltIns: 'usage',
        corejs: '3',
        // targets: { ie: '10' },
      },
    ],
    ['@babel/preset-react'],
    ['@babel/preset-typescript'],
  ],
  //esm和commonjs混用有冲突的话,使用'@babel/plugin-transform-modules-commonjs'插件
  plugins: ['@babel/plugin-transform-modules-commonjs'],
};
