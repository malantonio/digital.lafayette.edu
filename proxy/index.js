// because the projectblacklight demo site doesn't set CORS headers,
// we need to set up a proxy server to interact with it

var http = require('http')
var https = require('https')
var url = require('url')

// placeholder server for development, so we don't thrash
// the demo server
var fs = require('fs')
var path = require('path')
http.createServer(function (req, res) {
  fs.createReadStream(path.join(__dirname, 'en.json')).pipe(res)
}).listen(process.env.PROXY_PORT || 8081)

// var opts = function (query) {
//   return {
//     host: 'demo.projectblacklight.org',
//     path: '/en.json' + query,
//     headers: {
//       'Accept': 'application/json',
//     }
//   }
// }

// http.createServer(function (req, res) {
//   var reqHost = req.headers.host
//   var parsed = url.parse(req.url)

//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

//   return https.get(opts(parsed.search), function (searchRes) {
//     searchRes.pipe(res)
//   })
// }).listen(process.env.PROXY_PORT || 8081)
