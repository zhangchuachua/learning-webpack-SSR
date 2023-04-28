# note

## node 支持 import-export

如果要 node 原生支持 import-export 的话

1. node12 后可以使用 mjs 文件，支持 import-export
2. 在 package.json 文件中添加 `type: "module"` 可以支持 import-export；不清楚具体支持 `type: "module"` 的 node 版本

然后就可以借助 babel 支持 import-export 了

所以我们在引入 webpack 后，就可以使用 import-export 但是要运行代码的话，还需要使用 webpack 打包后再运行；

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

上面的方法编译完成后，还需要通过 file 去访问文件，而不是通过服务器，所以需要进行拓展

有三种方法可以在代码变化后自动重新编译代码

1. watch mode 观察模式，文件变化后重新打包，肯定不推荐，依然没有服务器，重新编译后需要手动刷新
2. webpack-dev-server 开启一个服务，可以开启热更新
3. webpack-dev-middleware 未了解

使用 webpack-dev-server 首先需要先安装 `yarn add webpack-dev-server -D`

然后再 webpack.config 中添加 devServer 字段

```js
module.exports = {
  // 。。。省略
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
```

配置完成，要开启服务的话，有两种方法：

1. cli: 使用 webpack serve 开启比如：webpack serve --config webpack.client.js 就是使用 webpack.client.js 中的 devServer 配置开启服务，cli 的参数配置请见[github](https://github.com/webpack/webpack-dev-server)
2. api: 添加一个 js 文件，比如 dev-server.js，然后使用 node dev-server.js 即可开启服务，比 cli 复杂一些，但是功能更多，包括了一些钩子函数；具体看见[文档](https://webpack.docschina.org/api/webpack-dev-server/)

## 使用 node 实现 SSR 时提示 "React is not defined" 的问题

先展示一下 node 的 webpack 配置：

```js
 module.exports = {
  target: 'node',
    // *需要使用相对路径，不能直接写 'main.js'
    entry: './main.js',
    output: {
    filename: "bundle.server.js",
      path: path.resolve(__dirname, 'dist/server'),
  },
  resolve: {
    alias: {
      '@components': './src/client/components',
        '@': './src'
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
      }
    ]
  },
  // !重点在这一块，因为 node 代码在服务器端，所以 node_modules 内的代码是不需要被打包的，是可以直接引用的，所以就可以使用 nodeExternals 忽略 node_modules 中的依赖，不打包这些内容；
externals: [nodeExternals()],
  externalsPresets: {
    node: true// !忽略 node 的内置模块，比如 fs path 等模块不会打包
  },
}
```

这样打包完成后执行，`node dist/server/bundle.server.js` 却提示 `React is not defined`; 去查看打包后的代码，jsx 被打包成为了 `React.createElement(...)` 而因为 nodeExternals 的存在，React 是没有被打包在 bundle.server.js 中的，所以引起了报错；

React 缺失，那么就应该引入它；于是，去组件文件中添加了 `import React from 'react'` 再次执行打包，打包后果然正常了；

但是我记得在 react 某个版本后，已经不需要显式的引入 `React` 了啊，为什么这里还是需要引入？既然 jsx 是 babel 负责在转换，那么就去 babel 中看一下；

jsx 是 preset-react 负责转换的，所以去查看 [preset-react](https://babel.dev/docs/babel-preset-react) 的配置, 发现只需要修改 runtime 为 automatic 即可自动引入；

于是 babel.config.js

```js
module.exports = api => {
  return {
    presets: [
      // caller.target 等于 webpack 的 target 选项
      // 可以根据 webpack.config 的 target 选项来决定如何转译；比如 node 和 web 应该使用不同的转译结果
      ["@babel/preset-env", { targets: api.caller(caller => caller && caller.target === 'node') ? { node: "current" } : "defaults" }],
      // *runtime 默认为 classic 不会导入任何东西；
      // *automatic 将会自动导入 转换 jsx 的函数；
      ["@babel/preset-react", { runtime: 'automatic' }]
    ]
  }
}
```

## 如何使用 koa-send 暴露静态资源

koa-send 其实只用于发送服务器资源，但是我们可以封装为暴露静态资源文件夹

参考了 [koa-static](https://github.com/koajs/static/blob/master/index.js) 的代码

```js
// 暴露静态文件夹
.use(async (ctx, next) => {
  // *先进入 next 让其他的进行处理；这样可以避免所有的请求都被当作是访问静态资源，比如说请求 /ssr 被误以为是访问 ssr 文件夹
  await next();
  // *当被其他处理完成后，再进行过滤
  if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return;
  // *static 开头的就表示在访问静态资源
  if (!ctx.path.startsWith('/static')) return;
  // *这里使用 __dirname, __filename 时要注意：__dirname, __filename 因为这个项目是使用 webpack 打包的，所以最后的 __dirname, __filename 应该是打包后的文件对应的路径
  // *所以我在这里使用了 resolve('.', 'dist/client'); '.' 在 resolve 中就表示根目录；
  // *这里的 ctx.path.replace('/static', '') 不是很严谨
  await send(ctx, ctx.path.replace('/static', ''), { root: path.resolve('.', 'dist/client') })
})
```