const pathResolve = function (path) {
  //当前node进程跑的目录
  // eslint-disable-next-line no-undef
  return process.cwd() + '/' + path;
};
module.exports = pathResolve;
