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