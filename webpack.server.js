const path = require('path');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');

const config = merge(baseConfig, {
  target: 'node',
  // *需要使用相对路径，不能直接写 'main.js'
  entry: './main.js',
  output: {
    filename: "bundle.server.js",
    path: path.resolve(__dirname, 'dist/server'),
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/client/components'),
      '@': path.resolve(__dirname, './src')
    },
    // *自动匹配后缀
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        // *因为我们有 client 和 server 两个 webpack 两边的配置写这很麻烦，所以直接使用在根目录下使用 babel.config.js 配置
      },
    ]
  },
  externals: [nodeExternals()],
  externalsPresets: {
    node: true
  },
});

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }
  return config;
}