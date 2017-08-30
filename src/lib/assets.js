const assets = {}

try {
  if (process.env.NODE_ENV === 'production') {
    const manifest = require('../../statics/bundle/manifest.json')
    // Change deployed host and path for your use case
    const url = '/statics/bundle/'
    Object.entries(manifest).forEach(([file, path]) => {
      assets[file] = `${url}${path}`
    })
  }
} catch (E) {
  console.error(E)
}

export default assets
