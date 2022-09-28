module.exports = function (content) {
  console.log('================这里是loader03================');
  return content;
};
module.exports.pitch = function () {
  console.log('================这里是pitch loader03================');
};
