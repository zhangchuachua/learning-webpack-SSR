const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: "bundle.client.js",
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': './src/client'
    },
    extensions: ['.jsx', '.js']
  },
  plugins: [new htmlWebpackPlugin({ template: "./src/client/index.html", inject: 'body' })],
  module: {
    // *使用 loader
    rules: [
      {
        test: /\.(js|jsx)$/,// 匹配 jsx 与 js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",// babel-loader 需要 bable-core
          // *options 可以写成这种格式，也可以在文件根目录下使用 babel.config.json | babel.config.js 具体的见 https://babeljs.io/docs/usage
          options: {
            presets: [
              // *preset-env 转换代码以兼容不支持对应功能的浏览器，preset 转换的程度受到 browserslist 的控制；注意：如果没有 browserslist 并且没有 target 选项时，preset-env 将假设目标是最旧的浏览器进行转换，所以如果没有 browserslist 那么需要手动添加 targets
              ['@babel/preset-env', { targets: 'defaults' }],
              // *主要就是转换 jsx
              ['@babel/preset-react']
            ],
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    // 服务暴露的文件夹
    static: './dist',
    // 是否启用压缩
    compress: true,
    // 端口
    port: 8091,
    // 开启热更新, 在 webpack-dev-server v4 后默认开启
    hot: true
  }
}