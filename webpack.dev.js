const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 5001,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
});
