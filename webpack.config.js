const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'site-generation'),
  mode: 'development',
  module: {
    rules: [{
      test: /.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /.pug$/,
      use: ['pug-loader'],
    }],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Web performance comparison',
    }),
  ],
};
