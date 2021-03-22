const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: path.resolve(__dirname, '/'),
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    inline: true,
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only',
  },
});
