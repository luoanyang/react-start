const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@services': path.resolve(__dirname, './src/services/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
    },
  },
  entry: {
    index: './src/index.jsx'
  },
  devServer: {
    contentBase: './dist',
    host: '127.0.0.1',
    hot: true,
    port: 3000,
  },
  performance: {},
  plugins: [
    new webpack.DefinePlugin({
      'PRODUCT': JSON.stringify(true)
    }),
    // 清除dist文件
    new CleanWebpackPlugin(),
    // 提取css文件
    new ExtractTextPlugin("css/[name].[hash].css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'wesion console',
      inject: 'body',
      template: path.resolve(__dirname, './index-template.html'),
      collapseWhitespace: true, //删除空格、换行
    }),
    new webpack.NamedModulesPlugin(),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),

  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    }, {
      test: /\.(jsx|js)$/,
      exclude: /node_module/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-arrow-functions', '@babel/plugin-proposal-class-properties']
        }
      }
    }]
  },
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}