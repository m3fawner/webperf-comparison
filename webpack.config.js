const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'site-generation'),
  mode: 'development',
  resolve: {
    extensions: ['.jsx', '...'],
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      use: ['babel-loader'],
      exclude: [/node_modules/],
    },
    {
      test: /\.jsx?$/,
      enforce: 'pre',
      use: ['source-map-loader'],
    }],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Web performance comparison',
      templateContent: '<div id="root"></div>',
      inject: 'body',
    }),
  ],
};
