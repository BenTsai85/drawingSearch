import React from 'react'
import { PjaxContainer } from 'iso-redux-pjax'
import { AppContainer } from '../containers/AppContainer'
import pageShared from '../pageShared'

const handler = () => {}

const mainComponent = () =>
  <PjaxContainer>
    <AppContainer />
  </PjaxContainer>

const mod = { handler, mainComponent }

export default mod
pageShared(mod)
