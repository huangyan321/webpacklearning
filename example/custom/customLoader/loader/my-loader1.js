//normal-loader
module.exports = function (content) {
  console.log('\n================这里是loader01================');
  return content;
};
module.exports.pitch = function () {
  console.log('\n================这里是pitch loader01================');
};
