const path = require('path');
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.js',
    //必须是绝对路径
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
};
