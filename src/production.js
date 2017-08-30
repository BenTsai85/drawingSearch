import 'babel-polyfill'
import app from './server'

// For manhattan
if (module.parent) {
  console.log('iso-redux application created.')
} else {
  // For npm run server
  const port = process.env.port || 80
  // Serve assets at local
  if (process.env.ASSETS === 'local') {
    app.use('/statics', require('express').static(`${process.cwd()}/statics`))
  }

  app.listen(port)
  console.log(`iso-redux application started on port ${port}`)
}

module.exports = app
