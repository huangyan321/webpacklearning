const { NodeSSH } = require('node-ssh');
const { validate } = require('schema-utils');
const colors = require('colors-console');
const schema = require('./upload.schema.json');
const ssh = new NodeSSH();
const color = {
  success: ['red', 'greenBG', 'underline'],
  error: ['white', 'redBG', 'underline'],
};
const info = function (msg, type = 'success') {
  console.log(colors(color[type], msg));
};
class AutoUploadPlugin {
  constructor(options) {
    validate(schema, options, {
      name: 'AutoUploadPlugin',
      baseDataPath: 'options',
    });
    const { host, username, password, remoteDirectory } = options;
    this.host = host;
    this.username = username;
    this.password = password;
    this.remoteDirectory = remoteDirectory;
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('AutoUploadPlugin', async (compilation, callback) => {
      const outputPath = compilation.outputOptions.path;
      try {
        await ssh.connect({
          host: this.host,
          username: this.username,
          password: this.password,
        });
        info(colors([], 'connection succeeded'));
      } catch (err) {
        info('connection failed: ' + err, 'error');
      }
      try {
        const res = await ssh.putDirectory(
          outputPath,
          this.remoteDirectory,
          //递归复制，10并发
          { recursive: true, concurrency: 10 },
        );
        if (res) {
          info('file transfer succeeded');
        } else {
          info('file transfer failed, please adjust configuration or try again', 'error');
        }
      } catch (err) {
        info(err, 'error');
      }
      ssh.dispose();
      callback();
    });
  }
}
module.exports = AutoUploadPlugin;
