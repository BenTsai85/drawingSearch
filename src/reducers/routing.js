import { handleActions } from 'redux-actions'

const initialState = {
  name: 'no routing name!',
  config: {},
  params: {},
  query: {}
}

const reducerMap = {
  SET_ROUTING_INFO: (state, action) => ({ ...state, ...action.payload })
}

export default handleActions(reducerMap, initialState)
