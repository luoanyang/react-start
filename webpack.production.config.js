module.exports = {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'PRODUCTION': JSON.stringify(true)
    })
  ]
}