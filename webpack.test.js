require('es6-promise').polyfill()
require('whatwg-fetch')

var context = require.context('./src', true, /\.?test\.js$/)
context.keys().forEach(context)

