import { handleActions } from 'redux-actions'

const initialState = {
  isMobile: false
}

const reducerMap = {
  SERVICE_SET_REQUEST: (state, action) => ({ ...state, isMobile: action.payload.isMobile })
}

export default handleActions(reducerMap, initialState)
