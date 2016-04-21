var webpack = require('webpack')

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },

  output: {
    library: 'duxy-superagent',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.js']
  }
}
