const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
  plugins: [
    // new UglifyJsPlugin({
    //   test: /\.js($|\?)/i
    // })
  ],
  entry: {
    index: './src/index.js',
    // cms: './src/cms/index.js'
  },
  output: {
    path: path.resolve('dist/js'),
    filename: '[name]_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.svg/, loader: 'svg-loader', exclude: /node_modules/ },      
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /.*?\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1
            }
          }
        ]
      }
    ]
  }
}