# note

## 如何构建 React 应用

```js
// webpack.client.js
module.exports = {
  entry: './src/client/index.js',
  output: {...},
  resolve: {
    alias: {
      '@': './src/client'
    },
    // 文件后缀，按顺序匹配，如果匹配到的话，就使用
    extensions: ['.jsx', '.js']
  },
  module: {
    // *使用 loader，目前还没有添加 css 等
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
  // *webpack 插件 htmlWebpackPlugin 用于生成一个 html 并且将打包好的 js 插入到 html 中去
  // *template 模板 inject js 文件注入的位置，此时为 body 所以 js 文件将在 body 中引入
  plugins: [new htmlWebpackPlugin({ template: "./src/client/index.html", inject: 'body' })],
  devtool: 'source-map'// *将生成 source-map
}
```

webpack 配置文件生成后，就可以使用 webpack-cli 进行构建，可以配置 scripts `"dev:client": "webpack --mode development --config webpack.client.js"`

--mode 模式有 `developemtn | production | none` 三种，可以在 `webpack.config.js | cli 参数 | 使用 NODE_ENV` 中指定，如果不指定的话，将会使用默认的 `production`；不同的 mode 有不同的打包优化；

--config 就是指定配置文件了

运行命令之后，可以在输出目录看到对应的输出了，这个时候，直接打开 html 就可以看到正确的渲染内容；

## 使用热更新拓展 react 应用

像[Z]