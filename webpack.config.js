var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');

var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
  })

  var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    port: 9000,
    stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home Page',
      hash: true,
      excludeChunks: ['contact'],
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Page',
      hash: true,
      chunks: ['contact'],
      filename: 'contact.html',
      template: './src/contact.html'
    }),
    new ExtractTextPlugin({
      filename: "app.css",
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
