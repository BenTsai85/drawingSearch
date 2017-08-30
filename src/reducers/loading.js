import { handleActions } from 'redux-actions'

const initialState = {
  isLoading: false
}

const reducerMap = {
  LOADING: (state, action) => ({ isLoading: !state.isLoading })
}

export default handleActions(reducerMap, initialState)
