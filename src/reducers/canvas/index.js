import { handleActions } from 'redux-actions'
import tool from './tool'
import suggest from './suggest'
import share from './share'
import layer from './layer'
import color from './color'

export default handleActions({
  ...tool.reducerMap,
  ...suggest.reducerMap,
  ...share.reducerMap,
  ...layer.reducerMap,
  ...color.reducerMap
}, {
  ...tool.initialState,
  ...suggest.initialState,
  ...share.initialState,
  ...layer.initialState,
  ...color.initialState
})
