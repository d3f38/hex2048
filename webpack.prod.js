const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '.' + path.resolve(__dirname, '/'),
  },
  optimization: {
    minimize: true,
  },
});
