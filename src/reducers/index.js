import { combineReducers } from 'redux'
import { pjaxLoading, pjax } from 'iso-redux-pjax'

import routing from './routing'
import device from './device'
import canvas from './canvas'
import image from './image'
import loading from './loading'
import product from './product'

const reducers = combineReducers({
  pjaxLoading,
  routing,
  device,
  canvas,
  image,
  loading,
  product
})

/// export the major reducer as default
export default (state, action) => pjax(reducers(state, action), action)
