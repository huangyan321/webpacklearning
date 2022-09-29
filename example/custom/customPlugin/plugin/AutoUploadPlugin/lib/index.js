const { NodeSSH } = require('node-ssh');
const { validate } = require('schema-utils');
const schema = require('./upload.schema.json');
const ssh = new NodeSSH();
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
        console.log('connection succeeded');
      } catch (err) {
        console.log('connection failed: ', err);
      }
      try {
        console.log(outputPath);
        console.log(this.remoteDirectory);
        const res = await ssh.putDirectory(
          outputPath,
          this.remoteDirectory,
          //递归复制，10并发
          { recursive: true, concurrency: 10 },
        );
        if (res) {
          console.log('file transfer succeeded');
        } else {
          console.log('file transfer failed, please adjust configuration or try again');
        }
      } catch (err) {
        console.log(err);
      }
      ssh.dispose();
      callback();
    });
  }
}
module.exports = AutoUploadPlugin;
