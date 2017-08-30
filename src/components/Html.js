import React from 'react'
import assets from '../lib/assets'

/// This is major htmlComponent for your application.
/// iso-redux will pass these props to you:
/// state: the final of the redux store
/// MainComponent: the mainComponent for this page which can re-rendered at client side
/// HeadComponent: the headComponent for this page which includes all <head /> and childrens
const Html = ({ state, MainComponent }) => {
  const name = state.routing.name
  const jsname = `${name}.js`
  const cssname = `${name}.css`
  return (
    <html>
      <head>
        <title>Canvas</title>
        <meta name='viewport' content='width=device-width, user-scalable=no' />
        {assets[cssname] ? <link rel='stylesheet' href={assets[cssname]} /> : null}
      </head>
      <body>
        <MainComponent />
        <script src={assets['webpackcore.js'] || '/statics/bundle/webpackcore.js'} />
        <script src={assets['vendor.js'] || '/statics/bundle/vendor.js'} />
        <script src={assets[jsname] || `/statics/bundle/${jsname}`} />
      </body>
    </html>
  )
}

export default Html
