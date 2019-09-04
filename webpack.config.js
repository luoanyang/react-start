const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@components': path.resolve(__dirname, './src/components/'),
    },
  },
  entry: {
    index: './src/index.jsx'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  performance: {},
  plugins: [
    new webpack.DefinePlugin({
      'PRODUCT': JSON.stringify(false)
    }),
    // 清除dist文件
    new CleanWebpackPlugin(),
    // 提取css文件
    new ExtractTextPlugin("css/[name].[hash:8].css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'React start',
      inject: 'body',
      template: path.resolve(__dirname, './index-template.html'),
      collapseWhitespace: true, //删除空格、换行
    }),
    new webpack.NamedModulesPlugin(),
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
          presets: ['@babel/preset-react']
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