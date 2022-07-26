// @ts-check

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'chat.js',
    clean: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.ROLLBAR_ACCESS_TOKEN': JSON.stringify(process.env.ROLLBAR_ACCESS_TOKEN),
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      inject: true,
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [

          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
