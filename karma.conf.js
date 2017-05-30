const webpack = require('webpack')

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: ['webpack.test.js'],
    preprocessors: {
      'webpack.test.js': [ 'webpack', 'sourcemap' ],
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js?$/,
            use: 'babel-loader',
          },
        ],
      },

      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },

      plugins: [
        new webpack.DefinePlugin({
          'process.env.API_BASE_URL': JSON.stringify('http://example.org'),
          'process.env.NODE_ENV': JSON.stringify('test'),
        })
      ],
    },

    webpackServer: {
      noInfo: true,
    },

    reporters: [
      'mocha',
      'coverage',
      'coveralls',
    ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    concurrency: Infinity,
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      includeAllSources: true,
    },
  })
}
