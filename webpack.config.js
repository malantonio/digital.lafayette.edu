const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {

        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  'src/scss',
                  'node_modules',
                ],
                sourceMapEmbed: true,
              }
            },
          ]
        }),
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
  }
}
