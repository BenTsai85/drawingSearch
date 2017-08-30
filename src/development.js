import compression from 'compression'
import express from 'express'
import webpack from 'webpack'
import device from 'express-device'
import webpackConfig from '../webpack.config.js'
import webpackMiddleware from 'webpack-dev-middleware'

/// We change NODE_ENV here because ynodejs will:
// Forcing NODE_ENV=production - this is a paranoids requirement!
// See: http://wiki.corp.yahoo.com/view/Devel/NodeJSAtYahoo
process.env.NODE_ENV = 'development'
require('dotenv').config()
require('debug').enable(process.env.DEBUG)

// Enable mock for testing/development
require('../mock/index')

const app = express()
// use express-device to simulate mod_mobilecatalog
app.use(device.capture())
app.use((req, res, next) => {
  req.isMobile = req.device.type !== 'desktop'
  next()
})

const port = process.env.port || 3000
const pwd = process.cwd()

// Serve bundle files on the fly
const compiler = webpack(webpackConfig)
app.use(webpackMiddleware(compiler, {
  noInfo: true,             // prevent webpack to show most logs
  stats: { colors: true },
  publicPath: webpackConfig.output.publicPath
}))

// enable gzip for speed
app.use(compression())
// Enable hot reload server
app.use(require('webpack-hot-middleware')(compiler))

// load server.js after we ready the development env
app.use(require('./server').default)

// Serve all other static files
app.use('/statics', express.static(`${pwd}/statics`))

app.listen(port, () => console.log(`Server start! Listening on port ${port}`))
