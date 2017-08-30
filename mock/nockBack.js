import fs from 'fs'
import path from 'path'
import debug from 'debug'
import { back } from 'nock'

const debugRecord = debug('nockBack:record')
const fixturePath = path.join(process.cwd(), 'mock/http')

back.fixtures = (back.currentMode === 'record') ? '/tmp/' : fixturePath

const appendDifferentRecord = (reqs, req) => {
  let noDupe = true

  reqs.forEach(R => {
    if (!noDupe) {
      return
    }
    if ((R.scope === req.scope) && (R.method === req.method) && (R.path === req.path) && (R.body === req.body)) {
      noDupe = false
    }
  })

  if (noDupe) {
    reqs.push(req)
  }

  return noDupe
}

if (process.env.NOCK_NAME) {
  const name = path.join(fixturePath, process.env.NOCK_NAME)
  back(process.env.NOCK_NAME, {
    recorder: {
      dont_print: false,
      use_separator: false,
      logging: content => {
        let ret = []
        try {
          ret = JSON.parse(fs.readFileSync(name))
        } catch (E) {
        }
        if (appendDifferentRecord(ret, content)) {
          debugRecord('%s records in %s now', ret.length, process.env.NOCK_NAME)
          fs.writeFileSync(name, JSON.stringify(ret, undefined, '  '))
        }
      }
    }
  }, function () {
    console.log(`mock http by nock, fixture: ${name}, mode: ${back.currentMode}`)
    this.scopes.forEach(S => S.persist())
  })
}
