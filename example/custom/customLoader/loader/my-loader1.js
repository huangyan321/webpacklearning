const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const schema = require('../schema/my-loader1.schema.json');
//normal-loader
module.exports = function (content) {
  //获取参数
  const options = this.getOptions();
  console.log('\n================这里是loader01================');
  console.log(options);

  validate(schema, options, {
    name: 'Example Loader',
    baseDataPath: 'options',
  });
  // 使用callback的方式返回content
  this.callback(null, content);
  // 异步loader
  // const callback = this.async();
  // setTimeout(function () {
  //   callback(null, content);
  // });
  // return content;
};
module.exports.pitch = function () {
  console.log('\n================这里是pitch loader01================');
};
