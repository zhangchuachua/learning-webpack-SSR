const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  entry: 'main.js',
  output: {
    filename: "bundle.server.js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            ['@babel/preset-env', { targets: 'defaults' }],
            '@babel/preset-react'
          ]
        }
      }
    ]
  },
  externals: [nodeExternals()],
  externalsPresets: {
    node: true
  },
}

module.exports = (env, argv) => {
  if(argv.mode === 'development') {
    config.devtool = 'source-map';
  }
}