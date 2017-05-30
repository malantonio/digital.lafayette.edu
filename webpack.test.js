require('es6-promise').polyfill()
require('whatwg-fetch')

// /Component/test.js
//      ~ or ~
// /store/actions.test.js
const context = require.context('./src', true, /\.?test\.js$/)
context.keys().forEach(context)

