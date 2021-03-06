var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
        'vue': 'vue/dist/vue.common.js'
    }
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
  ]
};
