const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // importLoaders 选项允许你配置在 css-loader 之前有多少 loader 应用于 @imported 资源与 CSS 模块/ICSS 导入。
              importLoaders: 2,
              // 1: postcss-loader
              // 2: postcss-loader, sass-loader
              modules: {
                mode: 'local',
                auto: true
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
}