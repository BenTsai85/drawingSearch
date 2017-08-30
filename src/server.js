import express from 'express'
import { createMiddlewareByRoute } from 'iso-redux'
import bodyParser from 'body-parser'
import { createMiddlewareByServiceList } from 'reservice'
// import { loginMiddleware } from './lib/login'
import services from './services/index'
import routing from './routing'
import 'isomorphic-fetch'
import fs from 'fs'
import path from 'path'
import Html from './components/Html'
import configureStore from './configureStore'
import { lzwDecode } from './utils/lzw'

const app = express()

// reservice need to access body as json
app.use(bodyParser.json({ limit: '1000mb' }))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '1000mb'
}))

app.use(express.static('statics/public'))
// handle login
// app.use(loginMiddleware)

app.post('/writefile', (req, res) => {
  const file = req.body.file
  const data = req.body.data
  fs.writeFile(
    path.join(__dirname, '../statics/storage/' + file),
    Buffer.from(data, 'base64'),
    err => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to write file' })
      } else {
        res.json({ success: 'File write success' })
      }
    }
  )
})

// adopt reservice here
app.use(createMiddlewareByServiceList(services))

// set up iso-redux middleware
app.use(createMiddlewareByRoute(routing, {
  defaultPage: {
    configureStore,
    htmlComponent: Html
  }
}))

export default app
