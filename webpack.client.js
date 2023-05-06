const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');

const config = merge(baseConfig, {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: "bundle.client.js",
    path: path.resolve(__dirname, 'dist/client')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/client')
    },
    extensions: ['.jsx', '.js']
  },
  plugins: [new htmlWebpackPlugin({
    template: "./src/client/index.html",
    inject: 'body',
    publicPath: '/static'
  })],
  module: {
    // *使用 loader
    rules: [
      {
        test: /\.(js|jsx)$/,// 匹配 jsx 与 js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",// babel-loader 需要 bable-core
          // *因为我们有 client 和 server 两个 webpack 两边的配置写这很麻烦，所以直接使用在根目录下使用 babel.config.js 配置
        }
      },
    ]
  },
  devtool: 'source-map',
  devServer: {
    // 服务暴露的文件夹
    static: './dist/client',
    // 是否启用压缩
    compress: true,
    // 端口
    port: 8091,
    // 开启热更新, 在 webpack-dev-server v4 后默认开启
    hot: true
  }
})

module.exports = config;