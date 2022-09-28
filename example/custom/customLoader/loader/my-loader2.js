module.exports = function (content) {
  console.log('================这里是loader02================');
  return content;
};
module.exports.pitch = function () {
  console.log('================这里是pitch loader02================');
};
